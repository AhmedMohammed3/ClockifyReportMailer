var fs = require('fs');
require('dotenv').config();
const axios = require('axios');
const { sendMail } = require('./mail');

const getPreviousWeekReport = async todayDate => {
	const url = `${process.env.CLOCKIFY_API_REPORTS_URL}/workspaces/${process.env.CLOCKIFY_3DDX_WORKSPACE_ID}/reports/detailed`;
	const dateRangeStart = new Date(
		todayDate.getTime() - 7 * 24 * 60 * 60 * 1000
	);
	const dateRangeEnd = todayDate;
	const response = await axios({
		method: 'post',
		url,
		headers: {
			'Content-Type': 'application/json',
			'X-API-KEY': process.env.CLOCKIFY_API_KEY
		},
		data: JSON.stringify({
			dateRangeStart,
			dateRangeEnd,
			sortOrder: 'DESCENDING',
			description: '',
			rounding: false,
			withoutDescription: false,
			amounts: null,
			amountShown: 'HIDE_AMOUNT',
			zoomLevel: 'WEEK',
			userLocale: 'ar',
			// exportType: 'PDF',
			customFields: null,
			userCustomFields: null,
			users: {
				contains: 'CONTAINS',
				ids: ['5d46cb1eb89de634abc4bc35'],
				status: 'ACTIVE_WITH_PENDING'
			},
			userGroups: {
				contains: 'CONTAINS',
				ids: [],
				status: 'ACTIVE_WITH_PENDING'
			},
			detailedFilter: {
				sortColumn: 'DATE',
				page: 1,
				pageSize: 50,
				auditFilter: null,
				quickbooksSelectType: 'ALL',
				options: {
					totals: 'CALCULATE'
				}
			}
		})
	});
	return response.data;
};

// set interval for 21 hours
// get today date
setInterval(async () => {
	const today = new Date();
	if (today.getDay() === 1) {
		const report = await getPreviousWeekReport(today);
		let html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${report.timeentries[0].userName} Clockify Weekly Report</title>
        <style>
        table {
            margin: auto;
            border-collapse: collapse;
        }
        th, td {
            padding: 10px;
        }
        table, th, td {
            border: 1px solid black;
          }
        </style>
    </head>
    <body>
        <h1>${report.timeentries[0].userName} Clockify Weekly Report</h1>
        <table>
            <thead>
                <tr>
                    <th>Start Date And Time</th>
                    <th>End Date And Time</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>`;
		report.timeentries.forEach(item => {
			html += `
        <tr>
            <td>${new Date(item.timeInterval.start).toLocaleDateString(
							'en-us',
							{
								weekday: 'long',
								year: 'numeric',
								month: 'short',
								day: 'numeric',
								hour: 'numeric',
								minute: 'numeric'
							}
						)}</td>
            <td>${new Date(item.timeInterval.end).toLocaleDateString('en-us', {
							weekday: 'long',
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric'
						})}</td>
            <td>${item.description}</td>
        </tr>`;
		});
		html += ` </tbody>
        </table>
        </body>
        </html>`;
		// write html to file
		fs.writeFileSync('./report.html', html);

		sendMail(
			html,
			report.timeentries[0].userName,
			new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
				'en-us',
				{
					weekday: 'long',
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				}
			),
			today.toLocaleDateString('en-us', {
				weekday: 'long',
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})
		);
		console.log(`done for today ${new Date()}`);
	} else {
		console.log(`Today is not the day ${new Date()}`);
	}
}, 1000 * 60 * 60 * 21);

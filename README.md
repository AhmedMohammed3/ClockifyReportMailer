# Clockify Report Mailer

## Description

This project is a tool to get clockify reports and send them as email to yourself or to your leads.

## Table of Contents

- [Clockify Report Mailer](#clockify-report-mailer)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribute](#contribute)
    - [Adding new features or fixing bugs](#adding-new-features-or-fixing-bugs)

## Installation

Open your terminal and run the following command<br/>
`git clone https://github.com/AhmedMohammed3/ClockifyReportMailer.git`

## Usage

1. Open your terminal in the cloned folder and run the following command:<br/>
   `npm i`
2. Create a file called `.env` and fill it with the following keys:
   1. CLOCKIFY_API_KEY: This is the clockify api key for the account you want to get the reports from.
   2. CLOCKIFY_API_REPORTS_URL: This is the url for the clockify api reports.
   3. CLOCKIFY_3DDX_WORKSPACE_ID: This is the clockify workspace id for the account you want to get the reports from.
   4. SENDING_EMAIL_USERNAME: This is the email username for the account you want to send the reports from.
   5. SENDING_EMAIL_PASSWORD: This is the email password for the account you want to send the reports from.
   6. RECIEVING_EMAIL_USERNAME: This is the email username for the account you want to send the reports to.


## Contribute

### Adding new features or fixing bugs

1. Open your terminal and clone the repository<br/>
   `git clone https://github.com/AhmedMohammed3/ClockifyReportMailer.git`
2. Create your branch<br/>
   `git checkout -b {YOUR_BRANCH_NAME}`
3. Make your edits and review it well.
4. Commit your changes with appropriate message. Follow [these git style guides](https://udacity.github.io/git-styleguide/)<br/>
   `git commit -m {YOUR_COMMIT_MESSAGE}`
5. Push your changes<br/>
   `git push origin {YOUR_BRANCH_NAME}`
6. Create a pull request

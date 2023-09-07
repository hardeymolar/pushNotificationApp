require('dotenv').config();
const express = require("express");
const app = express();


app.get('/info', (req, res) => {
    const slackName = req.query.slack_name;
    const track = req.query.track;

    // Get the current day
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    // Generate UTC time in ISO format
    const utcTime = new Date().toISOString();

    // Define github repo,file url and statuscode
    const githubRepoUrl = 'https://github.com/hardeymolar/dayInfoApp';
    const githubFileUrl = `${githubRepoUrl}/blob/main/app.js`;
    const statusCode = 200;

    // Create the response object
    const responseObject = {
        slack_name: slackName,
        current_day: currentDay,
        utc_time: utcTime,
        track: track,
        github_file_url: githubFileUrl,
        github_repo_url: githubRepoUrl,
        status_code: statusCode,
    };
    // Send the response as JSON
    res.json(responseObject);
});
PORT = process.env.PORT

app.listen(PORT,()=>console.log(`app is listening on port ${PORT}...`))

module.exports = survey => {
    return `
        <html>
            <body>
                <div>
                    <h3>I'd like your input!</h3>
                    <p>Please answer the following question:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="http://localhost:3000">yes</a>
                        <a href="http://localhost:3000">no</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};

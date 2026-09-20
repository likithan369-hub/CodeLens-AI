const fileInput = document.getElementById("file-input");
const fileName = document.getElementById("file-name");
const reviewBtn = document.getElementById("review-btn");
const statusText = document.getElementById("status");
const results = document.getElementById("results");
const dropArea = document.getElementById("drop-area");

let selectedFile = null;


// ===============================
// FILE SELECTION
// ===============================

if (fileInput) {
    fileInput.addEventListener("change", function () {

        if (fileInput.files && fileInput.files.length > 0) {
            selectedFile = fileInput.files[0];
            showSelectedFile(selectedFile);
        }

    });
}


// ===============================
// SHOW SELECTED FILE
// ===============================

function showSelectedFile(file) {

    if (fileName) {
        fileName.textContent = `✓ ${file.name}`;
    }

    if (reviewBtn) {
        reviewBtn.disabled = false;
    }

    if (statusText) {
        statusText.textContent = "File ready for analysis";
    }
}


// ===============================
// DRAG AND DROP
// ===============================

if (dropArea) {

    dropArea.addEventListener("dragover", function (event) {

        event.preventDefault();

        dropArea.classList.add("dragover");

    });


    dropArea.addEventListener("dragleave", function () {

        dropArea.classList.remove("dragover");

    });


    dropArea.addEventListener("drop", function (event) {

        event.preventDefault();

        dropArea.classList.remove("dragover");

        const files = event.dataTransfer.files;

        if (files && files.length > 0) {

            selectedFile = files[0];

            showSelectedFile(selectedFile);
        }

    });

}


// ===============================
// RUN AI REVIEW
// ===============================

if (reviewBtn) {

    reviewBtn.addEventListener("click", async function () {

        if (!selectedFile) {

            if (statusText) {
                statusText.textContent = "Please select a file first.";
            }

            return;
        }


        reviewBtn.disabled = true;

        reviewBtn.innerHTML =
            "<span>Analyzing Code...</span><span>⏳</span>";


        if (statusText) {
            statusText.textContent =
                "AI is reviewing your code...";
        }


        const formData = new FormData();

        formData.append("file", selectedFile);


        try {

            const response = await fetch(
                "http://127.0.0.1:8000/upload",
                {
                    method: "POST",
                    body: formData
                }
            );


            const responseText = await response.text();


            let data;

            try {

                data = JSON.parse(responseText);

            } catch (parseError) {

                throw new Error(
                    "Backend returned an invalid response."
                );
            }


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Backend failed to analyze the file."
                );
            }


            console.log("Backend response:", data);


            displayResults(data);


            if (statusText) {
                statusText.textContent =
                    "Review completed successfully.";
            }


        } catch (error) {

            console.error("Review error:", error);


            if (statusText) {

                statusText.textContent =
                    "Review failed: " + error.message;
            }


        } finally {

            reviewBtn.disabled = false;

            reviewBtn.innerHTML =
                "<span>Run AI Review</span><span>→</span>";

        }

    });

}


// ===============================
// DISPLAY RESULTS
// ===============================

function displayResults(data) {

    if (!results) {
        console.error("Results section not found.");
        return;
    }


    results.classList.remove("hidden");


    const review = data.gemini_review || {};

    const analysis = data.analysis || {};

    const sourceCode = data.source_code || "";


    // ===============================
    // SOURCE CODE PREVIEW
    // ===============================

    const previewFilename =
        document.getElementById("preview-filename");

    if (previewFilename) {

        previewFilename.textContent =
            data.filename ||
            selectedFile?.name ||
            "Uploaded File";
    }


    const previewLanguage =
        document.getElementById("preview-language");

    if (previewLanguage) {

        previewLanguage.textContent =
            getLanguage(
                data.filename ||
                selectedFile?.name ||
                ""
            );
    }


    const sourcePreview =
        document.getElementById("source-code-preview");

    if (sourcePreview) {

        sourcePreview.textContent =
            sourceCode ||
            "Source code preview unavailable.";
    }


    // ===============================
    // SCORE
    // ===============================

    const score =
        Number(review.score) || 0;


    const scoreElement =
        document.getElementById("score");

    if (scoreElement) {
        scoreElement.textContent = score;
    }


    const scoreRingValue =
        document.getElementById("score-ring-value");

    if (scoreRingValue) {
        scoreRingValue.textContent = score;
    }


    const scoreRing =
        document.querySelector(".score-ring");


    if (scoreRing) {

        const degrees =
            Math.max(0, Math.min(score, 100)) * 3.6;


        scoreRing.style.background =
            `conic-gradient(
                var(--green) ${degrees}deg,
                #293244 ${degrees}deg
            )`;
    }


    // ===============================
    // SUMMARY
    // ===============================

    const summary =
        document.getElementById("summary");


    if (summary) {

        summary.textContent =
            review.summary ||
            "No summary available.";
    }


    // ===============================
    // REVIEW CATEGORIES
    // ===============================

    renderList(
        "bugs",
        review.bugs
    );


    renderList(
        "security",
        review.security
    );


    renderList(
        "performance",
        review.performance
    );


    renderList(
        "code-quality",
        review.code_quality
    );


    renderList(
        "maintainability",
        review.maintainability
    );


    renderList(
        "suggestions",
        review.suggestions
    );


    // ===============================
    // FILE NAME
    // ===============================

    const resultFilename =
        document.getElementById("result-filename");


    if (resultFilename) {

        resultFilename.textContent =
            data.filename ||
            selectedFile?.name ||
            "Uploaded File";
    }


    // ===============================
    // TOTAL LINES
    // ===============================

    const totalLines =
        document.getElementById("total-lines");


    if (totalLines) {

        totalLines.textContent =
            analysis.total_lines ??
            "--";
    }


    // ===============================
    // ISSUE COUNT
    // ===============================

    const issueCount =
        countIssues(review);


    const issuesElement =
        document.getElementById("issues-count");


    if (issuesElement) {

        issuesElement.textContent =
            issueCount;
    }


    // ===============================
    // SCROLL TO RESULTS
    // ===============================

    results.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ===============================
// RENDER REVIEW LIST
// ===============================

function renderList(elementId, items) {

    const container =
        document.getElementById(elementId);


    if (!container) {
        return;
    }


    container.innerHTML = "";


    // No issues

    if (
        !items ||
        !Array.isArray(items) ||
        items.length === 0
    ) {

        container.innerHTML =
            '<p style="color:#22c55e;">✓ No issues detected.</p>';

        return;
    }


    const ul =
        document.createElement("ul");


    items.forEach(function (item) {

        const li =
            document.createElement("li");


        li.textContent =
            formatReviewItem(item);


        ul.appendChild(li);

    });


    container.appendChild(ul);
}


// ===============================
// FORMAT GEMINI RESPONSE OBJECTS
// ===============================

function formatReviewItem(item) {

    // Normal string

    if (typeof item === "string") {
        return item;
    }


    // Number / boolean

    if (
        typeof item === "number" ||
        typeof item === "boolean"
    ) {

        return String(item);
    }


    // Null / undefined

    if (item === null || item === undefined) {

        return "Issue details unavailable.";
    }


    // Array

    if (Array.isArray(item)) {

        return item
            .map(function (value) {

                return formatReviewItem(value);

            })
            .join(", ");
    }


    // Object

    if (typeof item === "object") {

        const preferredFields = [

            "description",
            "issue",
            "message",
            "title",
            "recommendation",
            "suggestion",
            "details",
            "explanation",
            "problem",
            "reason"

        ];


        for (
            let i = 0;
            i < preferredFields.length;
            i++
        ) {

            const field =
                preferredFields[i];


            if (
                item[field] !== undefined &&
                item[field] !== null
            ) {

                return formatReviewItem(
                    item[field]
                );
            }
        }


        // If there are no common fields,
        // show the complete object safely.

        return Object.entries(item)

            .map(function ([key, value]) {

                let formattedValue;


                if (
                    typeof value === "object" &&
                    value !== null
                ) {

                    formattedValue =
                        JSON.stringify(value);

                } else {

                    formattedValue =
                        String(value);
                }


                return `${key}: ${formattedValue}`;

            })

            .join(" | ");
    }


    return String(item);
}


// ===============================
// COUNT ISSUES
// ===============================

function countIssues(review) {

    const categories = [

        review.bugs,
        review.security,
        review.performance,
        review.code_quality,
        review.maintainability

    ];


    let count = 0;


    categories.forEach(function (items) {

        if (Array.isArray(items)) {

            count += items.length;
        }

    });


    return count;
}


// ===============================
// DETECT LANGUAGE
// ===============================

function getLanguage(filename) {

    if (!filename) {
        return "Code";
    }


    const parts =
        filename.split(".");


    if (parts.length < 2) {
        return "Code";
    }


    const extension =
        parts.pop().toLowerCase();


    const languages = {

        py: "Python",

        java: "Java",

        js: "JavaScript"

    };


    return languages[extension] || "Code";
}
// Updated students with 3 subjects each
let students = [
    {
        name: "Alice",
        marks: { Math: 85, Science: 90, English: 78 }
    },
    {
        name: "Bob",
        marks: { Math: 70, Science: 88, English: 92 }
    },
    {
        name: "Charlie",
        marks: { Math: 95, Science: 60, English: 82 }
    }
];

let tableData = [];  // will store flattened student-subject-score rows
let sortDirection = true;

// Convert each student's subject marks into rows
function processStudentData() {
    tableData = [];

    students.forEach(student => {
        for (let subject in student.marks) {
            tableData.push({
                name: student.name,
                subject: subject,
                score: student.marks[subject]
            });
        }
    });
}

function loadTable(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    data.forEach(row => {
        tableBody.innerHTML += `
            <tr>
                <td>${row.name}</td>
                <td>${row.subject}</td>
                <td>${row.score}</td>
            </tr>
        `;
    });
}

function sortTable(column) {
    sortDirection = !sortDirection;

    tableData.sort((a, b) => {
        if (a[column] < b[column]) return sortDirection ? -1 : 1;
        if (a[column] > b[column]) return sortDirection ? 1 : -1;
        return 0;
    });

    updateTable();
}

function updateTable() {
    let subject = document.getElementById("subjectFilter").value;
    let min = document.getElementById("minScore").value;
    let max = document.getElementById("maxScore").value;

    let filtered = tableData.filter(row => {
        return (subject === "" || row.subject === subject) &&
               (min === "" || row.score >= min) &&
               (max === "" || row.score <= max);
    });

    loadTable(filtered);
}

// Prepare table data on start
processStudentData();
loadTable(tableData);

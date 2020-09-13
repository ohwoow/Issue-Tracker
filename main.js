document.addEventListener('DOMContentLoaded', function () {
  const issueInputForm = document.getElementById("issueInputForm")
  let issues = []

  // Add issue to LocalStorage
  function saveIssue(e) {
    e.preventDefault()

    // Get Values of Inputs
    const issueDescr = document.getElementById("issueDescInput").value
    const issueSeverity = document.getElementById("issueSeverityInput").value
    const issueAssigned = document.getElementById("issueAssignedToInput").value
    const issueId = chance.guid()
    const issueStatus = "Open"

    // Create object with values
    const issue = {
      id: issueId,
      description: issueDescr,
      severity: issueSeverity,
      assigned: issueAssigned,
      status: issueStatus
    }

    if (localStorage.getItem("issues")) {
      issues = JSON.parse(localStorage.getItem("issues"))
      issues.push(issue)
      localStorage.setItem("issues", JSON.stringify(issues))
    } else {
      issues.push(issue)
      localStorage.setItem("issues", JSON.stringify(issues))
    }

    issueInputForm.reset()

    fetchIssues()

  }

  // Add issue
  function fetchIssues() {
    const issues = JSON.parse(localStorage.getItem("issues"))
    const issuesList = document.getElementById("issuesList")

    issuesList.innerHTML = ""

    if (localStorage.getItem("issues")) {
      issues.forEach(item => {
        const id = item.id;
        const desc = item.description
        const severity = item.severity
        const assigned = item.assigned
        const status = item.status


        issuesList.innerHTML += `
        <div class="well">
          <h6>Issue ID: ${id}</h6>
          <p>
          <span class="label label-info">Status: ${status}</span>
          </p>
          <h3>${desc}</h3>
          <p>
            <span class="glyphicon glyphicon-time"></span>
            ${severity}
          </p>
          <p>
            <span class="glyphicon glyphicon-user"></span>
            ${assigned}
          </p>
          <a href="#" class="btn btn-warning btn-status" data-id="${id}">Close</a>
          <a href="#" class="btn btn-danger btn-delete" data-id="${id}">Delete</a>
        </div>
      `
      });
      setStatusClosed()
      deleteIssue()
    }
  }


  function setStatusClosed() {

    const issues = JSON.parse(localStorage.getItem('issues'))

    const btnStatus = document.querySelectorAll(".btn-status")
    btnStatus.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault()
        for (const key of issues) {
          if (key.id === item.dataset.id) {
            key.status = "Closed"
          }
        }
        localStorage.setItem("issues", JSON.stringify(issues))
        fetchIssues()
      })

    })
  }

  function deleteIssue() {
    const issues = JSON.parse(localStorage.getItem('issues'))

    const btnDelete = document.querySelectorAll(".btn-delete")
    btnDelete.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault()
        for (const key of issues) {
          if (key.id === item.dataset.id) {
            issues.splice(key, 1)
          }
        }
        localStorage.setItem("issues", JSON.stringify(issues))
        fetchIssues()
      })

    })
  }

  issueInputForm.addEventListener("submit", saveIssue)

  fetchIssues()
})
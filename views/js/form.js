function submit_form(e) {
    $.ajax({
        url: "localhost:3000/api/results",
        type: "POST",
        data: new FormData($("#test_form")[0]),
        processData: false,
        contentType: false,
        success: submit_success,
        error: submit_error
    });
}

function submit_success() {
    alert("Success!");
}

function submit_error() {
    alert("Fail!");
}

function submit_form(e) {
    $.ajax({
        url: "http://localhost:3000/api/results",
        type: "POST",
        data: new FormData($("#evaluation_form")[0]),
        processData: false,
        contentType: false,
        success: submit_success,
        error: submit_error
    }).done((data) => {
        if (!/[\w_]+\@\w\.\w{2,3}/.exec(data["email"])) {
            $("#email").addClass("has-error");
        }
    });
}

function submit_success() {
    alert("Success!");
}

function submit_error(err) {
    console.error(err);
}

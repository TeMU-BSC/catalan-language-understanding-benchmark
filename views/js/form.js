function check_mail (mail) {
    let mailError = false;
    if (/[\w_]+\@\w\.\w{2,3}/.exec(mail) == null) {
        $("#emailDiv").addClass("has-error");
        mailError = true;
    }
    return mailError
}

function check_link (paperLink) {
    let linkError = false;
    if (/http[s]?:\/\/[\w-]+\.\w{2,3}[\/\w-]*\.?\w{0,4}/.exec(paperLink) == null) {
        $("#emailDiv").addClass("has-error");
        linkError = true;
    }
    return linkError
}

function check_form () {
    const formData = new FormData($("#evaluation_form")[0]);
    const mailErr = check_mail (formData.get("email"));
    const linkErr = check_link (formData.get("paperLink"));
    if (mailErr && linkErr) {
        submit_form ()
    }
}

function submit_form() {
    $.ajax({
        url: "http://localhost:3000/api/results",
        type: "POST",
        data: new FormData($("#evaluation_form")[0]),
        processData: false,
        contentType: false,
        success: submit_success,
        error: submit_error
    });
}

function submit_success() {
    alert("Success!");
}

function submit_error(err) {
    console.error(err);
}

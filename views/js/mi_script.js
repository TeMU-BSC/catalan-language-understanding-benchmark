async function obtainTables() {
    the_json = await $.ajax({
        url: "http://localhost:3000/api/tables",
        dataType: "json",
        // contentType: "application/json",
        success: tableSuccess,
        error: tableError
    })
        .catch((e) => { console.log(e) });
    return the_json
}

function tableSuccess(d) {
    // console.log(d);
}

function tableError(e) {
    console.log(e);
}


$(document).ready(()=>{
    let responseTables = obtainTables().then((v) => {
        let arr = v.map((element)=>{
            return [element.email, element.modelName, element.researchGroup, element.paperLink, element.task1, element.task2, element.task3, element.task4, element.task5]
        });
        console.log = arr;
        responseTables = arr;
    })
    .catch((e) => { console.log(e) });
    // let arr = responseTables.map((element)=>{
        // return [element.email, element.modelName, element.researchGroup, element.paperLink, element,task1, element.task2, element.task3, element.task4, element.task5];
        // return {email: element.email}
        // return {
            // email: element.email,
            // modelName: element.modelName,
            // researchGroup: element.researchGroup,
            // paperLink: element.paperLink,
            // task1: element.task1,
            // task2: element.task2,
            // task3: element.task3,
            // task4: element.task4,
            // task5: element.task5
        // }
    // });

    // console.log(arr)
    const headers = ['Rank', 'Model', 'Group', 'Paper', 'Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];

    let innerTable = '<table class="table performaceTable">';
    innerTable += '<tr>';
    $(headers).each(function (header) {
        innerTable += '<th>' + headers[header];
    });

    $(responseTables).each(function (elem) {
        innerTable += '<tr>'
        $(responseTables[elem]).each(function (innerElem) {
            switch (innerElem) {
                case 0:
                    innerTable += '<td>' + (elem + 1);
                    break;
                case 3:
                    innerTable += '<td><a>' + responseTables[elem][innerElem];
                    break;
                case 2:
                    innerTable += '<td>' + responseTables[elem][innerElem] + '<br>' + responseTables[elem][0]
                    break;
                default:
                    innerTable += '<td>' + responseTables[elem][innerElem];
                }
        });
    });

    $('#leaderboard').html(innerTable);
})

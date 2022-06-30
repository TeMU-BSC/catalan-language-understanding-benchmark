let mockData = [
    {
        email: 'test@mail.es',
        modelName: 'Megatron',
        researchGroup: 'BSC',
        paperLink: 'https://google.com',
        task1: '81.35',
        task2: '85.87/77.90',
        task3: '81.35',
        task4: '85.87/77.90',
        task5: '85.87/77.90',
    },
    {
        email: 'test@mail.es',
        modelName: 'Alfred',
        researchGroup: 'BSC2',
        paperLink: 'https://google.com',
        task1: '81.35',
        task2: '85.87/77.90',
        task3: '81.35',
        task4: '85.87/77.90',
        task5: '85.87/77.90',
    },
    {
        email: 'test@mail.es',
        modelName: 'Pepe',
        researchGroup: 'BSC3',
        paperLink: 'https://google.com',
        task1: '81.35',
        task2: '85.87/77.90',
        task3: '81.35',
        task4: '85.87/77.90',
        task5: '85.87',
    }
];


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
    let arr = mockData.map((element)=>{
        return [element.email, element.modelName, element.researchGroup, element.paperLink, element.task1, element.task2, element.task3, element.task4, element.task5]
    });

    let innerTable = '<table class="table performaceTable">';
    innerTable += '<tr><th>Rank</th><th>Model</th><th>Group</th><th>Paper</th><th>Task 1</th><th>Task 2</th><th>Task 3</th><th>Task 4</th><th>Task 5</th></tr>';

    $(arr).each(function (elem) {
        innerTable += '<tr>'
        $(arr[elem]).each(function (innerElem) {
            if (innerElem == 3) 
                innerTable += '<td><a>' + arr[elem][innerElem] + '<a/></td>';
            else 
                innerTable += '<td>' + arr[elem][innerElem] + '</td>';
        });
        innerTable += '</tr>';
    });

    innerTable += '</table>';
    console.log(innerTable);

    $('#leaderboard').html(innerTable);
})

let mockData = [
    {
        email: 'test@mail.es',
        modelName: 'Megatron',
        researchGroup: 'BSC',
        paperLink: 'google.es',
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
        paperLink: 'google.es',
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
        paperLink: 'google.es',
        task1: '81.35',
        task2: '85.87/77.90',
        task3: '81.35',
        task4: '85.87/77.90',
        task5: '85.87',
    }
];


$(document).ready(()=>{
    let arr = mockData.map((element)=>{
        return [element.email, element.modelName, element.researchGroup, element.paperLink, element.task1, element.task2, element.task3, element.task4, element.task5]
    });

    // let tr = ''
    let innerTable = '<table class="table performaceTable">';
    innerTable += '<tr><th>Rank</th><th>Model</th><th>Group</th><th>Paper</th><th>Task 1</th><th>Task 2</th><th>Task 3</th><th>Task 4</th><th>Task 5</th></tr>';

    $(arr).each(function (elem) {
        innerTable += '<tr>'
        $(arr[elem]).each(function (innerElem) {
            innerTable += '<td>' + arr[elem][innerElem] + '</td>';
        });
        innerTable += '</tr>';
    });

    innerTable += '</table>';
    console.log(innerTable);

    $('#leaderboard').html(innerTable);
})
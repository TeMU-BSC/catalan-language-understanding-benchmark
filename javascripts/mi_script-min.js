function obtainTables(){$.ajax({url:"http://localhost:3000/api/tables",dataType:"json",success:tableSuccess,error:tableError})}function tableSuccess(a){console.log(a);let e=a.map(a=>[a.email,a.modelName,a.researchGroup,a.paperLink,a.task1,a.task2,a.task3,a.task4,a.task5]);const t=["Rank","Model","Group","Paper","NER (F1)","POS (F1)","STS","ViquiQuAD","XQuAD","TECa","TeCla","AnCora"];let o='<table class="table performaceTable">';o+="<tr>",$(t).each(function(a){o+="<th>"+t[a]}),$(e).each(function(a){o+="<tr>",$(e[a]).each(function(t){switch(t){case 0:o+="<td>"+(a+1);break;case 3:o+="<td><a>"+e[a][t];break;case 2:o+="<td>"+e[a][t]+"<br>"+e[a][0];break;default:o+="<td>"+e[a][t]}})}),$("#leaderboard").html(o)}function tableError(a){console.log(a)}$(document).ready(()=>{obtainTables()});
function obtainTables(){$.ajax({url:"https://bsclsaina01.bsc.es/clubapi/tables",dataType:"json",success:tableSuccess,error:tableError})}function tableSuccess(e){console.log(e);const a=e.map(e=>[e.email,e.modelName,e.researchGroup,e.paperLink,/\d+\.\d{2}/.exec(e.STS_ca.combined_score),/\d+\.\d{2}/.exec(e.POS.F1),/\d+\.\d{2}/.exec(e.VilaQuAD.exact)+"/"+/\d+\.\d{2}/.exec(e.VilaQuAD.f1),/\d+\.\d{2}/.exec(e.ViquiQuAD.exact)+"/"+/\d+\.\d{2}/.exec(e.ViquiQuAD.f1),/\d+\.\d{2}/.exec(e.XQuAD_Ca.exact)+"/"+/\d+\.\d{2}/.exec(e.XQuAD_Ca.f1),/\d+\.\d{2}/.exec(e.TeCla.Accuracy),/\d+\.\d{2}/.exec(e.TECa.Accuracy),/\d+\.\d{2}/.exec(e.AnCora_ca.F1)]),c=["Rank","Model","Group","Paper","STS","POS","VilaQuAD","ViquiQuAD","XQuAD","TECa","TeCla","AnCora"];let d='<table class="table performanceTable">';d+="<tr>",$(c).each(function(e){d+="<th>"+c[e]}),$(a).each(function(e){d+="<tr>",$(a[e]).each(function(c){switch(c){case 0:d+="<td>"+(e+1);break;case 3:d+="<td><a href="+a[e][c]+">"+a[e][c];break;case 2:d+="<td>"+a[e][c];break;default:d+="<td>"+a[e][c]}})}),$("#leaderboard").html(d)}function tableError(e){console.error(e)}$(document).ready(()=>{obtainTables()});
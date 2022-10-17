function obtainTables(){$.ajax({url:"https://bsclsaina01.bsc.es/clubapi/tables",dataType:"json",success:tableSuccess,error:tableError})}function tableSuccess(t){let e=t.map(t=>[t.modelName,t.researchGroup,t.paperLink,Number(Number(t.sum)/Number(9)).toPrecision(4).toString(),Number(t.AnCora_ca.F1).toPrecision(4).toString(),Number(t.POS.F1).toPrecision(4).toString(),Number(t.STS_ca.combined_score).toPrecision(4).toString(),Number(t.TeCla.Accuracy).toPrecision(4).toString(),Number(t.TECa.Accuracy).toPrecision(4).toString(),Number(t.CatalanQA_results.f1).toPrecision(4).toString()+"/"+Number(t.CatalanQA_results.exact).toPrecision(4).toString(),Number(t.XQuAD_Ca.f1).toPrecision(4).toString()+"/"+Number(t.XQuAD_Ca.exact).toPrecision(4).toString()]);const a=["Model","Submitted By","Paper","Score","NER (F1)","POS (F1)","STS-ca (Comb.)","TeCla (Acc.)","TE-Ca (Acc.)","CatalanQA (F1/EM)","XQuAD-ca (F1/EM)"],r=["","","","","ner","pos","sts","tecla","teca","catalanqa","xquad"];let o='<table id="table" class="performanceTable table">';o+="<thead><tr>",$(a).each(function(t){""!=r[t]?o+='<th><a href="datasets.html#'+r[t].toLowerCase()+'">'+a[t]+"</a></th>":o+="Paper"===a[t]?'<th style="width:30px;">'+a[t]+"</th>":"<th>"+a[t]+"</th>"}),o+="</tr></thead></tbody>",$(e).each(function(t){o+="<tr>",$(e[t]).each(function(a){switch(a){case 2:""!=e[t][a]?o+='<td><a target="_blank" href='+e[t][a]+'><span class="material-symbols-outlined">open_in_new</span></a></td>':o+="<td></td>";break;default:o+="<td>"+e[t][a]+"</td>"}}),o+="</tr>"}),o+="</tbody></table>",$("#leaderboard").html(o),$("#table").DataTable({paging:!1,autoWidth:!1,order:[],columnDefs:[{targets:[0,1,2],orderable:!1}],searching:!1})}function tableError(t){console.error(t)}$(document).ready(()=>{obtainTables()});
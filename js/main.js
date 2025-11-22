import { select, innerJoin } from "./utils.js";

$(document).ready(async function(){
    loadView()
});


async function loadView(){

    // recupero delle view
    const views = await select('view', 'select a, b, c, d', true)
    // const spese = await select('spesa', 'select a, b, c, d', true)
    
    
    // const data = innerJoin(views, spese, 'id_spesa', 'id_spesa')
    // const data = innerJoin(views, spese, 'id_spesa', 'id_spesa')
    
    views.forEach(v => {
        const item_list = `
        <li class="list-item my-padding">
            <div class="description">
                <h2>${v.get('nome')}</h2>
                <h4>${v.get('descrizione')}</h4>
            </div>
            <div class="btn"><i class="fa-solid fa-trash"></i></div>
        </li>`
        
        $('#home-views').append(item_list)
    });


}
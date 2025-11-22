/**
 * variables
 * */ 
var url = "https://docs.google.com/spreadsheets/d/172fCjQ3urGI_IFYQGlE5x1T5ntMYe8MOwQEXHv53fSk/edit"
const tabelle = (await fetchJSONData('../public/id-sheets.json'))['sheets']

/**
 * functions 
 * */ 
async function fetchJSONData(path) {
    try {
        const response = await fetch(path)

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        return await response.json()

    } catch (err) {
        console.error("Failed to fetch:", err)
        return undefined
    }
}

export async function select(from, query, is_pretty){
    
    const prom = new Promise((resolve, reject) => {

        sheetrock({
            url : `${url}#gid=${tabelle[from]}`,
            query: query.toUpperCase(),
            sheet: from,
            callback: function(error, options, response) {
                if (!error) {
                    resolve(response)
                } else {
                    reject(error)
                }
            }
        })
    })

    if(is_pretty){
        return castToArrayOfMap(await prom)
    }

    return prom
}

function castToArrayOfMap(data){
    // recupero intestazione e valori
    const col_values = data['rows'].map((item)=>{
        return item['cellsArray']
    })
    const col_names = col_values.shift()

    // creo l'array di Map
    const arr = Array()
    col_values.forEach(val => {
        
        const row = new Map()
        col_names.forEach((name, i) => {
            row.set(name, val[i])
        })
        arr.push(row)
        
    });
    // console.log(arr)

    return arr
}

export function innerJoin(arr1, arr2, key1, key2) {
    arr1 = cartesianProduct(arr1, arr2)
    return arr1
        .filter(item => item[0].get(key1) === item[1].get(key2))
        .map(item => new Map([...item[0], ...item[1]]))
}

function cartesianProduct(...arrays) {
    return arrays.reduce((acc, curr) => {
        const result = [];
        acc.forEach(a => {
            curr.forEach(b => {
                result.push([...a, b]);
            });
        });
        return result;
    }, [[]]);
    }
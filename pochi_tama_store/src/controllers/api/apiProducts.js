const { Op } = require('sequelize');
const db = require('../../database/models');
const Products = db.Product;

module.exports = controller = {

    products: async (req, res) => {

        try{
            let url = `http://${req.headers.host}${req.originalUrl}`;
            if(url.includes('page') && !url.includes('size')){
                throw new SyntaxError("Dato incorrecto")
            }

            const { page, size, orderBy, orderDirect, ...updateQuery } = req.query;
            const order = orderBy ? orderBy : 'id';
            const direction = orderDirect ? orderDirect : 'ASC';
            console.log(updateQuery);            

            for(let key in updateQuery){

                if(updateQuery[key] == null || updateQuery[key].trim().length == 0){
                    delete updateQuery[key]
                }else{

                    if(key == 'name'){
                        updateQuery[key] = {[Op.substring] : req.query.name};
                    }
                }
            }
            console.log(updateQuery)

            const getPagination = (page, size) => {
                const limit = size ? +size : 10;
                const offset = page ? page * limit : 0;
                return{ limit, offset }
            }
            const { limit, offset } = getPagination(page, size);

            getPageData = (data, page, limit) => {

                const { count, rows: result } = data;
                const pages = Math.ceil(count / limit);
                const currentPage = page ? +page : 0;

                if(currentPage > pages){
                    throw new SyntaxError('dato incompleto: sin nombre'); // (*)
                }else{

                    let page_params = url.substring(url.search(/page/i), url.search(/&/i))
                    let next_page = '';
                    let previous_page = '';

                    if(url.includes('page')){

                        if(currentPage == 0){
                            next_page = url.replace(page_params, `page=${currentPage + 1}`)
                        }else{
                            previous_page = url.replace(page_params, `page=${currentPage - 1}`);
                            next_page = url.replace(page_params, `page=${currentPage + 1}`)
                        }
                    }else{
                        next_page = `${url}?page=${currentPage + 1}&size=${limit}`;
                    }

                    const next = currentPage == (pages - 1) ? null : next_page;
                    const previous = currentPage == 0 ? null : previous_page;
                
                    return { count, pages, currentPage, previous, next, result }
                }
            }

            let data = await Products.findAndCountAll({
                where: updateQuery,
                order: [[order, direction]],
                limit: limit,
                offset: offset,
                include: [{
                    association: 'subcategories',
                    include: [{association: 'category'}]
                }]
            })

            let result = await getPageData(data, page, limit)

            let response = {
                info: {
                    count: result.count,
                    pages: result.pages,
                    currentPage: result.currentPage,
                    previous: result.previous,
                    next: result.next
                },
                result: result.result
            }

            return res.status(200).json(response)

        }catch(error){
            return res.status(500).json({
                msg: "Lo siento, ocurrió un error."
            })
        }
    }
}
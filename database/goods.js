var base = require('./base');
var image = require('./image');

module.exports = {
    get : async function(id){
        var sql = 'select * from Goods where ID=@ID;SELECT s.*,i.Inventory,i.Sales,i.Price FROM malll.goodsinventory i left join goodssize s on i.ID = s.GoodsInventoryID where i.GoodsID = @ID;select * from Image where OwnerID = @ID and Type = 1 order by OrderIndex asc;';
        
        var result;
        try{
            result = await base.execSqlByParam(sql,{ID:id});
        }catch(ex){
            console.log(ex)
        }
        
        if(result.length > 0 && result[0].length > 0){
//            var images = await image.getAll(1,id);
            var goods = result[0][0];
            goods.GoodsInventory = result[1];
            goods.images = result[2];
            return goods;
        }else{
            return false;
        }
    }
}
jQuery(document).ready(function(){
    jQuery('*[data-tagflow]').each(function(index){
        var context = jQuery(this);
        var padding = parseInt(context.attr('data-tagflow-padding'));
        var margin = parseInt(context.attr('data-tagflow-margin'));
        context.attr('data-tagflow-id', index);
        context.find('a').each(function(){
            $(this)
                .attr('data-tagflow-width', 0)
                .css({'padding':padding + 'px', 'margin':margin + 'px'})
        });
        context.resizeTags = function(){
            var contextWidth = this.innerWidth();
            var contextId = this.attr('data-tagflow-id');
            var padding = parseInt(this.attr('data-tagflow-padding'));
            var margin = parseInt(this.attr('data-tagflow-margin'));
            var sizes = [];
            var widthSum = 0;
            var rows = [];
            rows[0] = [];
            var rowCount = 0;
            var aCount = 0;
            this.find('a').each(function(i){
                var aObj = jQuery(this);
                if (aObj.attr('data-tagflow-width') == 0)
                {
                    aObj.attr('data-tagflow-width',parseInt(aObj.outerWidth()));
                }
                var aWidth = parseInt(aObj.attr('data-tagflow-width'));
                var totalASize = aWidth+(padding*2)+(margin*2);
                if (widthSum + totalASize < contextWidth)
                {
                    rows[rowCount][aCount] = {'id':i, 'width':totalASize};
                    aCount++;
                    widthSum += totalASize;
                }
                else
                {
                    var rowlength = rows[rowCount].length;
                    var rowWidth = 0;
                    var offset = padding*2;
                    for (var b=0; b<rowlength; b++)
                    {
                        rowWidth += rows[rowCount][b].width;
                    }
                    if (rowWidth & 1)
                    {
                         rowWidth = rowWidth + 1;
                    }
                    var difference = contextWidth-rowWidth;
                    var addWidth = (Math.floor(((difference/rowlength))+offset));
                    for (var b=0; b<rowlength; b++)
                    {
                        var aObjTemp = jQuery('[data-tagflow-id=' + contextId + '] a:eq(' + rows[rowCount][b].id +')');

                        pL = Math.ceil(parseInt(aObjTemp.attr('data-tagflow-width')) + addWidth);
                        aObjTemp.css('width',pL + 'px');
                    }
                    rowCount++;
                    rows[rowCount] = [];
                    aCount = 0;
                    rows[rowCount][aCount] = {'id':i, 'width':totalASize};
                    aCount++;
                    widthSum = totalASize;
                }
                sizes[i] = totalASize;
            });
        }
        context.resizeTags();
        var a = setInterval(function(){context.resizeTags()},100);
    });
});
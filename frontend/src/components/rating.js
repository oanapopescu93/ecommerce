const Rating = {
    render: function(props){
        var text = '0 reviews';
        if(props.reviews){
            text = props.reviews + ' reviews';
        }

        if (!props.rating || text === '0 reviews') {
            return `<div class="rating">
                <span><i class="fa fa-star-o"></i></span>
                <span><i class="fa fa-star-o"></i></span>
                <span><i class="fa fa-star-o"></i></span>
                <span><i class="fa fa-star-o"></i></span>
                <span><i class="fa fa-star-o"></i></span>
                <span> ${text} </span>
            </div>`;
        }        

        var star_array = [];
        var t = Math.trunc(props.rating);
        var h = props.rating-t;
        for(var i=0; i<5; i++){
            var star = 'fa fa-star-o';
            if(i<t){
                star = 'fa fa-star';
            } else if(i === t && h === 0.5){
                star = 'fa fa-star-half-o';
            }
            star_array.push(star);
        }
        
        return `<div class="rating">
                ${star_array.map(function(x){
                    return`<span>
                        <i class="${x}"></i>
                    </span>`;
                }).join('\n')}
            <span> ${text} </span>
        </div>`
    }
}

export default Rating;
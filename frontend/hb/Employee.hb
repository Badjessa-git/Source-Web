        <div class="row">   
            {{#each mData}}
            <div class="col-xs-12 col-sm-6 col-md-4">
                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                    <div class="mainflip">
                        <div class="frontside">
                            <div class="card">
                                <div class="card-body text-center">
                                    <p><img class=" img-fluid img-responsive" src="https://drive.google.com/uc?export=view&id={{{this.imgUrl}}}" alt="card image"></p>
                                    <h4 class="card-title">{{this.firstName}} {{this.lastName}}</h4>
                                    <p class="card-text">{{this.classYear}} | {{this.major}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="backside">
                            <div class="card">
                                <div class="card-body text-center mt-4">
                                    <h4 class="card-title">{{this.firstName}} {{this.lastName}}</h4>
                                    <p class="card-text">{{this.descript}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {{/each}}
        </div>

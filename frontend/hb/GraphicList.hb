<div class="panel panel-default" id="GraphicList">
    <div class="panel-heading">
        <h2 class="panel-title my-2">Graphic Design Work Order</h2>
    </div>
    <div class="panel-body">
        <div class="table-responsive table-hover">
            <table class="table">
                <thead class="table-dark">
                    <th scope="col">#</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Club/Organization</th>
                    <th scope="col">Event Date</th>                    
                    <th scope="col">Timestamp</th>
                    <th scope="col"></th>
                </thead>
                <tbody>
                    {{#each mData}}
                    <tr>
                        <th scope="row">{{this.jobId}}</th>
                        <td>{{this.lastName}}</td>
                        <td>{{this.email}}</td>
                        <td>{{this.club}}</td>
                        <td>{{this.eventDeadline}}</td>
                        <td>{{this.timeStamp}}</td>
                        <td><button class="GraphicList-editbtn" data-toggle="modal" data-target="#exampleModalCenter2" data-value="{{this.jobId}}">View/Edit</button></td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>
        </div>
    </div>
</div>
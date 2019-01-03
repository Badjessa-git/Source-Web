<div class="panel panel-default" id="PrintList">
    <div class="panel-heading">
        <h3 class="panel-title">Print Job Requests</h3>
    </div>
    <div class="panel-body">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Club/Organization</th>
                    <th scope="col">Color</th>                    
                    <th scope="col">Number of Copies</th>
                    <th scope="col">File</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Completed</th>
                </thead>
                <tbody>
                    {{#each mData}}
                    <tr>
                        <th scope="row">{{mData.jobId}}</th>
                        <td>{{mData.firstName}}</td>
                        <td>{{mData.lastName}}</td>
                        <td>{{mData.email}}</td>
                        <td>{{mData.club}}</td>
                        <td>{{mData.color}}</td>
                        <td>{{mData.numCopies}}</td>
                        <td>{{mData.file_upload}}</td>
                        <td>{{mData.timeStamp}}</td>
                        <td><input type="checkbox" value="{{mData.done}}"></td> 
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
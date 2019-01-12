<div class="modal fade" id="exampleModalCenter3" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle3" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-dark">
        <h5 class="modal-title" id="exampleModalLongTitle3">Top Clubs</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div class="panel panel-default" id="MonthClub">
                <div class="panel-body">
                    <div class="table-responsive table-hover">
                        <table class="table">
                            <thead class="table-dark">
                                <th scope="col">#</th>
                                <th scope="col">Club/Organization</th>
                                <th scope="col">occurence</th>                    
                                <th scope="col">Percentage</th>
                            </thead>
                            <tbody>
                                {{#each mData}}
                                <tr>
                                    <th scope="row">{{inc @index}}</th>
                                    <td>{{this.name}}</td>
                                    <td>{{this.occurence}}</td>
                                    <td>{{this.percentagge}}</td>
                                </tr>
                                {{/each}}
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
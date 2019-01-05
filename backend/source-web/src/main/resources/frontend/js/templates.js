(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['PrintList.hb'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <tr>\n                        <th scope=\"row\">"
    + alias2(alias1((depth0 != null ? depth0.jobId : depth0), depth0))
    + "</th>\n                        <td>"
    + alias2(alias1((depth0 != null ? depth0.lastName : depth0), depth0))
    + "</td>\n                        <td>"
    + alias2(alias1((depth0 != null ? depth0.email : depth0), depth0))
    + "</td>\n                        <td>"
    + alias2(alias1((depth0 != null ? depth0.club : depth0), depth0))
    + "</td>\n                        <td>"
    + alias2(alias1((depth0 != null ? depth0.color : depth0), depth0))
    + "</td>\n                        <td>"
    + alias2(alias1((depth0 != null ? depth0.timeStamp : depth0), depth0))
    + "</td>\n                        <td><button class=\"PrintList-editbtn\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\" data-value=\""
    + alias2(alias1((depth0 != null ? depth0.jobId : depth0), depth0))
    + "\">View/Edit</button></td>\n                    </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"panel panel-default\" id=\"PrintList\">\n    <div class=\"panel-heading\">\n        <h2 class=\"panel-title my-2\">Print Job Requests</h2>\n    </div>\n    <div class=\"panel-body\">\n        <div class=\"table-responsive table-hover\">\n            <table class=\"table\">\n                <thead class=\"table-dark\">\n                    <th scope=\"col\">#</th>\n                    <th scope=\"col\">Last Name</th>\n                    <th scope=\"col\">Email</th>\n                    <th scope=\"col\">Club/Organization</th>\n                    <th scope=\"col\">Color</th>                    \n                    <th scope=\"col\">Timestamp</th>\n                    <th scope=\"col\"></th>\n                </thead>\n                <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.mData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </tbody>\n            </table>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['EntryItem.hb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"modal fade\" id=\"exampleModalCenter\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header bg-dark\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">"
    + alias2(alias1((depth0 != null ? depth0.lastName : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? depth0.timeStamp : depth0), depth0))
    + "</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n            <form name=\"printjob\" class=\"main-form\">\n            <div class=\"row\">\n                <div class=\"col\">\n                    <div class=\"form-group\">\n                        <label for=\"firstname\">Firstname</label>\n                        <input class=\"form-control\" type=\"text\" name=\"firstname\" id=\"firstname\" value="
    + alias2(alias1((depth0 != null ? depth0.firstName : depth0), depth0))
    + " readonly/>\n                    </div>\n                </div>\n                <div class=\"col\">\n                    <div class=\"form-group\">\n                        <label for=\"lastname\">Lastname</label>\n                        <input class=\"form-control\" type=\"text\" name=\"lastname\" id=\"lastname\" value="
    + alias2(alias1((depth0 != null ? depth0.lastName : depth0), depth0))
    + " readonly/>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"email\">Email</label>\n                <input class=\"form-control\" type=\"text\" name=\"email\" id=\"email\" value=\""
    + alias2(alias1((depth0 != null ? depth0.email : depth0), depth0))
    + "\" readonly/>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"club_orgs\">Club/Orgnization</label>\n                <input class=\"form-control\" type=\"text\" name=\"club_orgs\" id=\"club_orgs\" value="
    + alias2(alias1((depth0 != null ? depth0.club : depth0), depth0))
    + " readonly/>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <div class=\"form-group\">\n                        <label for=\"color\">Color</label>\n                        <input class=\"form-control\" type=\"text\" name=\"color\" id=\"color\" value="
    + alias2(alias1((depth0 != null ? depth0.color : depth0), depth0))
    + " readonly/>\n                    </div>\n                </div>\n                <div class=\"col\">\n                    <div class=\"form-group\" id=\"num_copies\">\n                        <label for=\"num_copies\">Number of Copies</label>\n                        <input class=\"form-control\" type=\"text\" name=\"num_copies\" id=\"num_copies\" value="
    + alias2(alias1((depth0 != null ? depth0.numCopies : depth0), depth0))
    + " readonly/>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"file_upload\">File to print</label>\n                <p><a href="
    + alias2(alias1((depth0 != null ? depth0.file : depth0), depth0))
    + " class=\"tooltip-test\" target=\"_blank\" title=\"Tooltip\">"
    + alias2(alias1((depth0 != null ? depth0.file : depth0), depth0))
    + "</a></p>            \n            </div>\n            <div class=\"form-group>\n                <label for=\"done\">Completed</label>\n                <select class=\"form-control\" name=\"done\" id=\"options\">\n                    <option value=\"Completed\">Completed</option>\n                    <option value=\"Not Completed\">Not Completed</option>\n                </select> \n            </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\">Save changes</button>\n      </div>\n    </div>\n  </div>\n</div>";
},"useData":true});
})();

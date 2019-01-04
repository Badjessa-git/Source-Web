(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['PrintList.hb'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <tr>\n                        <th scope=\"row\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mData : depth0)) != null ? stack1.jobId : stack1), depth0))
    + "</th>\n                        <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mData : depth0)) != null ? stack1.firstName : stack1), depth0))
    + "</td>\n                        <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mData : depth0)) != null ? stack1.lastName : stack1), depth0))
    + "</td>\n                        <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mData : depth0)) != null ? stack1.email : stack1), depth0))
    + "</td>\n                        <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mData : depth0)) != null ? stack1.club : stack1), depth0))
    + "</td>\n                        <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mData : depth0)) != null ? stack1.color : stack1), depth0))
    + "</td>\n                        <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mData : depth0)) != null ? stack1.numCopies : stack1), depth0))
    + "</td>\n                        <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mData : depth0)) != null ? stack1.file_upload : stack1), depth0))
    + "</td>\n                        <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mData : depth0)) != null ? stack1.timeStamp : stack1), depth0))
    + "</td>\n                        <td><input type=\"checkbox\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mData : depth0)) != null ? stack1.done : stack1), depth0))
    + "\"></td> \n                    </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"panel panel-default\" id=\"PrintList\">\n    <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">Print Job Requests</h3>\n    </div>\n    <div class=\"panel-body\">\n        <div class=\"table-responsive\">\n            <table class=\"table\">\n                <thead>\n                    <th scope=\"col\">#</th>\n                    <th scope=\"col\">First Name</th>\n                    <th scope=\"col\">Last Name</th>\n                    <th scope=\"col\">Email</th>\n                    <th scope=\"col\">Club/Organization</th>\n                    <th scope=\"col\">Color</th>                    \n                    <th scope=\"col\">Number of Copies</th>\n                    <th scope=\"col\">File</th>\n                    <th scope=\"col\">Timestamp</th>\n                    <th scope=\"col\">Completed</th>\n                </thead>\n                <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.mData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </tbody>\n            </table>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();

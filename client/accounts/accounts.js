var myLogoutFunc = function(){
	console.log('goodbye')
	Router.go('/')
};

var mySubmitFunc = function(error,state){
	console.log(error);
	console.log(state);
};

AccountsTemplates.configure({
	privacyUrl: 'privacy',
	homeRoutePath: '/',
	onLogoutHook: myLogoutFunc,
	onSubmitHook: mySubmitFunc,
});


var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);
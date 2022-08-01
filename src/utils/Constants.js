const Constants = {
	Locales: ['pl', 'en'],
	DefaultStringLimit: 255,
	EmailPattern: new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i),
	PasswordPattern: new RegExp(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/),
	SiteUrlPattern: new RegExp(/^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\\/?\\.#-]+\.?)+(\/[^\s]*)?$/i),
};

export default Constants;

(function() {
  // Rule set
  var contactFormConfig = {
    id: "get-in-touch",
    rules: [
      {
        fieldName: "name",
        required: true,
        longMessage: "Name is required",
        shortMessage: 'Required'
      },
      {
        fieldName: "name",
        regex: /[^\s-]{2,}/,    // At least 2 non-space character
        longMessage: "Fix name",
        shortMessage: 'Fix'
      },
      {
        fieldName: "email",
        required: true,
        longMessage: "Email address is required",
        shortMessage: 'Required'
      }
      {
        fieldName: "email",
        regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        longMessage: "Fix email address",
        shortMessage: 'Fix'
      },
      {
        fieldName: "phone",
        required: true,
        longMessage: "Phone number is required",
        shortMessage: 'Required'
      },
      {
        fieldName: "phone",
        regex: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/,
        longMessage: "Fix phone",
        shortMessage: 'Fix'
      },
      {
        fieldName: "message",
        required: true,
        longMessage: "Message is required",
        shortMessage: 'Required'
      }
    ]
  };
  
  enableValidate(contactFormConfig);
} ());

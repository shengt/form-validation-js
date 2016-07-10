(function() {
  function validate(rule, value) {
    if (rule.required && !value.trim()) {
      return {
        buttonMessage: rule.longMessage,
        inputMessage: rule.shortMessage
      };
    }
    if (rule.regex && typeof value === 'string') {
      var isValid = rule.regex.test(value);
      if (!isValid) {
        return {
          buttonMessage: rule.longMessage,
          inputMessage: rule.shortMessage
        };
      }
    }
  }

  // A general form validation implemented with vanilla Js
  function enableValidate(config) {
    var errorClass = 'invalid';
    var successClass = 'success';
    var invalidMsgClass = 'invalid-msg';
    
    var form = document.getElementById(config.id);
    var submitBtn = form.querySelector('[type=submit]');
    
    // Submit btn message
    var _submitBtnText = [{
      issuer: '__origin',
      message: submitBtn.value
    }];
    function addSubmitBtnMessage(message, issuer) {
      _submitBtnText.push({
        issuer: issuer,
        message: message
      });
      return message;
    }

    function removeSubmitBtnMessage(issuer) {
      _submitBtnText = _submitBtnText.filter(function (btnText) {
        return btnText.issuer !== issuer;
      });
      return _submitBtnText[_submitBtnText.length - 1].message;
    }
    
    function clearSubmitBtnMessage() {
      _submitBtnText = _submitBtnText.slice(0, 1);
      return _submitBtnText[0].message;
    }

    function showError(fieldNode, form, error) {
      if (error) {
        form.classList.add(errorClass);
        fieldNode.classList.add(errorClass);
        fieldNode.classList.remove(successClass);
        submitBtn.disabled = true;
        
        if (typeof error === 'object') {
          submitBtn.value = addSubmitBtnMessage(error.buttonMessage, fieldNode.querySelector('input,textarea,select').name);
          var inputMessageNodes = fieldNode.getElementsByClassName(invalidMsgClass);
          if (inputMessageNodes.length === 0) {
            var inputMessageNode = document.createElement('div');
            inputMessageNode.className = invalidMsgClass;
            var t = document.createTextNode(error.inputMessage);
            inputMessageNode.appendChild(t);
            fieldNode.appendChild(inputMessageNode);
          } else {
            inputMessageNodes[0].firstChild.nodeValue = error.inputMessage;
          }
        }
      }
    }

    function clearError(form) {
      clearFormError(form)
      form.querySelectorAll('.' + errorClass).forEach(function(fieldNode) {
        showSuccess(fieldNode);
      });
      submitBtn.value = clearSubmitBtnMessage();
    }
    
    function clearFormError(form) {
      form.classList.remove(errorClass);
      submitBtn.disabled = false;
      submitBtn.value = clearSubmitBtnMessage();
    }

    function showSuccess(fieldNode, form) {
      fieldNode.classList.remove(errorClass);
      fieldNode.classList.add(successClass);
      removeMessage(fieldNode);
      submitBtn.value = removeSubmitBtnMessage(fieldNode.querySelector('input,textarea,select').name);
      
      if (form.querySelectorAll('.' + errorClass).length === 0) {
        clearFormError(form);
      }
    }
    
    function removeMessage(fieldNode) {
      var invalidMsgNodes = fieldNode.getElementsByClassName(invalidMsgClass);
      if (invalidMsgNodes.length) {
        fieldNode.removeChild(invalidMsgNodes[0]);
      }
    }
    
    function doValidation(rule, form, input) {
      var error = validate(rule, input.value);
      if (error) {
        showError(input.parentNode, form, error);
        return error;
      } else {
        showSuccess(input.parentNode, form);
      }
    }
    
    if (form) {
      form.addEventListener('submit', function(evt) {
        for (var i = 0, len = config.rules.length; i < len; i++) {
          var rule = config.rules[i];
          var input = form.querySelector('[name=' + rule.fieldName + ']');
          var error = doValidation(rule, form, input);
          if (error) {
            evt.preventDefault();
            break;
          }
        }
      });

      config.rules.forEach(function(rule) {
        var input = form.querySelector('[name=' + rule.fieldName + ']');
        input.addEventListener('blur', function(evt) {
          doValidation(rule, form, input);
        });
      });
    }
  }
  
  window.enableValidate = enableValidate;
}(window));

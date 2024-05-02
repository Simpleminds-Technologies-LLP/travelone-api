// Import the Payment class from the specified URL
import { Payment } from 'https://checkout-assets.payments.tamg.cloud/stable/v2/payment.js';

var payment;

function initPaymentIframe(paymentSessionToken) {
    payment = new Payment(paymentSessionToken);
    payment.renderCard({
        cardElementContainer: 'viator_payment_iframe_holder',
        onFormUpdate: onFormUpdate,
        styling: {
            variables: {
                fontSize: '9px',
                colorBackground: '#FFF',
                colorPrimaryText: '#000'
            }
        }
    });
}

function onFormUpdate(event) {
    // Handle form update event if needed
    console.log('Form update event:', );
}

// get token from cookie
// var payment_session_token = '<?php echo $viator_payment_session_token; ?>';
var payment_session_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImVlZTgzNTdmLTJjMWMtNGFmOS1iNGY5LTMzZDgzMGIzODI2ZCJ9.eyJjaGVja291dFNlc3Npb25JZCI6IkNTSS1TLW01dmhsM3R5MmZkdnJobWRvdmFzN3lleGk0IiwibWVyY2hhbnRJZCI6Ik1FUi1WSUFUT1IiLCJjbGllbnRJZCI6IlAwMDEyMjcxOCIsImFtb3VudCI6MTI0My44NCwiY3VycmVuY3kiOiJVU0QiLCJsb2NhbGUiOiJlbiIsImNyZWRpdENhcmRFbnRyeVVybCI6Imh0dHBzOi8vYXBpLnN0YWdpbmcudGFwYXltZW50cy5jb20vdWkvdjEvY2hlY2tvdXQvQ1NJLVMtbTV2aGwzdHkyZmR2cmhtZG92YXM3eWV4aTQvY2NlbnRyeSIsImF1Z21lbnRUb2tlblVybCI6Imh0dHBzOi8vY2hlY2tvdXQtYXBpLWhhcmUucGF5bWVudHMtZGV2LnRhbWcuY2xvdWQvdjEvY2hlY2tvdXQvYXVnbWVudGVkUGF5bWVudFNlc3Npb24iLCJ0aHJlZURTRGF0YVVybCI6Imh0dHBzOi8vY2hlY2tvdXQtYXBpLWhhcmUucGF5bWVudHMtZGV2LnRhbWcuY2xvdWQvdjEvY2hlY2tvdXQvM2RzIiwibG9nZ2luZ1VybCI6Imh0dHBzOi8vY2hlY2tvdXQtYXBpLWhhcmUucGF5bWVudHMtZGV2LnRhbWcuY2xvdWQvdjEvY2hlY2tvdXQvbG9nIiwiZmluZ2VycHJpbnRTdWJtaXNzaW9uVXJsIjoiaHR0cHM6Ly9jaGVja291dC1hcGktaGFyZS5wYXltZW50cy1kZXYudGFtZy5jbG91ZC92MS9jaGVja291dC9kZXZpY2VGaW5nZXJwcmludCIsInByb2ZpbGluZ0NvbmZpZ3VyYXRpb24iOnsiY2xpZW50SWQiOiJWZ1pnRlIwX1IyaGFVUEpXQXo4WWx6ZkZrY00iLCJob3N0bmFtZSI6InRlc3QuYWNjZGFiLm5ldCIsImZpbmdlcnByaW50SWQiOiJJTkFVVEgtZDkxNDAxNmItOWE5MC00YTg3LWI0ZTctZTM5MDFkYzRmNDBiIn0sInB1cmNoYXNlQ29udGV4dHMiOlt7InN1cHBsaWVyTG9jYXRpb24iOnsicG9zdGNvZGUiOiI3NzUwMCIsImNvdW50cnkiOiJNWCJ9fV19.jWokbOm9BSaw3r8WcCMB1Wdw4F0Yxpi01Csl_7ugvkZhMhNMIIb5pS6-5MGZyx7GEumK9hvzs_AXVTSe23pETXDiFTJcQKymziYGguzTcumJr_hMd_PCtaByvgjH0VBaPPKXFtbiQ_VyUtK7DrZw5balfqji0SWvSUESufYwT3vFdFF9eVDFDSXVgez_olS7fRrv_5_z283xQyIfg-pqWrsMacVAMdQa-jhS9bTvxLXImCIlXgo5nulqsoMAA-O6ZXzZBEXH07kF1ZvEFeIzhYlWhgPzFTNnEu_2hFMaakLkBE_gb-RhIMOWabRkVL8UrldpyKZqB43OjrZf6e4eiA';

// check token is valid
if(payment_session_token) {
    // Call the function with your payment session token
    initPaymentIframe(payment_session_token);
} else {
    alert('Oops! Problem in loading payment gateway. Please reload page again.');
}

function onSubmit(e) {
    const bodyData = {
        address: {
            country: 'US',
            postalCode: '33609'
        }
    };

    payment.submitForm(bodyData).then((res) => onSubmitSuccess(res)).catch((err) => onSubmitError(err));
}

function onSubmitSuccess(message) {
    console.log('Success checkout msg...');
    console.log(message);
}

function onSubmitError(error) {
    console.log('Error checkout msg...');
    console.log(error);
}
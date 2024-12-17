export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Email Verification</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: linear-gradient(120deg, #1a1a1a, #2b2b2b);
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 600px;
      margin: 50px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

    .main-content {
      padding: 40px 30px;
      color: #333;
      text-align: center;
    }

    .header {
      font-size: 28px;
      font-weight: 600;
      color: #2C3E50;
      margin-bottom: 20px;
    }

    .sub-header {
      font-size: 16px;
      color: #7F8C8D;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .otp {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      background-color: #2980B9;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: inline-block;
      letter-spacing: 1px;
    }

    .button {
      width: 100%;
      background: #2980B9;
      text-decoration: none;
      display: inline-block;
      padding: 15px 0;
      color: #fff;
      font-size: 18px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
      margin-bottom: 20px;
    }

    .button:hover {
      background-color: #3498DB;
    }

    .footer {
      font-size: 14px;
      color: #BDC3C7;
      margin-top: 20px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
      }

      .button {
        width: 100% !important;
      }

      .header {
        font-size: 24px !important;
      }

      .otp {
        font-size: 28px !important;
        padding: 12px !important;
      }

      .sub-header {
        font-size: 14px !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td class="header">
                          Verify Your Email
                        </td>
                      </tr>
                      <tr>
                        <td class="sub-header">
                          We’re almost there!
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="otp">
                            {{otp}}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="sub-header">
                          No need to worry — your account's been created & Passwords being handled.
                        </td>
                      </tr>
                        <td class="footer">
                          If you did not request this, simply ignore this email. We are here to keep things secure.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;
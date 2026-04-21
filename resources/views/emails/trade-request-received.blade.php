<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
    <h2 style="margin: 0 0 16px;">New Trade Request</h2>

    <p style="margin: 0 0 12px;">
        A new request was submitted from the front page.
    </p>

    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr>
            <td style="padding: 6px 12px 6px 0; font-weight: bold;">Full name:</td>
            <td style="padding: 6px 0;">{{ $requestData['full_name'] }}</td>
        </tr>
        <tr>
            <td style="padding: 6px 12px 6px 0; font-weight: bold;">Email:</td>
            <td style="padding: 6px 0;">{{ $requestData['email'] }}</td>
        </tr>
        <tr>
            <td style="padding: 6px 12px 6px 0; font-weight: bold;">Jurisdiction:</td>
            <td style="padding: 6px 0;">{{ $requestData['jurisdiction'] ?? 'N/A' }}</td>
        </tr>
        <tr>
            <td style="padding: 6px 12px 6px 0; font-weight: bold;">Estimated BTC volume:</td>
            <td style="padding: 6px 0;">{{ $requestData['estimated_btc_volume'] }}</td>
        </tr>
        <tr>
            <td style="padding: 6px 12px 6px 0; font-weight: bold; vertical-align: top;">Transaction context:</td>
            <td style="padding: 6px 0;">{{ $requestData['transaction_context'] ?? 'N/A' }}</td>
        </tr>
    </table>
</div>

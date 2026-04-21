<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TradeRequestReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public array $requestData,
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Trade Request Received',
            replyTo: [
                new Address($this->requestData['email'], $this->requestData['full_name']),
            ],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.trade-request-received',
        );
    }
}

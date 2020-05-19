package com.project.omega.helper;

import com.sendgrid.*;
import com.sendgrid.Response;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;

public class EmailSender {
    @Value("${sendGrid.key}")
    private static String key;

    public static void send(String to, String subject, String content) throws IOException {
        Email fromUser = new Email("esrs_omega@gmail.com");
        Email toUser = new Email(to);
        Content contents = new Content("text/html", "a href=\"52.177.233.178/api/" + content + "\">Click to confirm registration and login.</a>");
        Mail mail = new Mail(fromUser, subject, toUser, contents);

        SendGrid sg = new SendGrid(System.getenv(key));
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}

package com.project.omega.helper;
import com.sun.mail.smtp.SMTPTransport;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

public class EmailSender {

    private static final String SMTP_SERVER = "smtp.gmail.com";

    public static void send(String to, String subject, String content) {
        Properties prop = System.getProperties();
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(prop, null);
        Message msg = new MimeMessage(session);

        try {
            msg.setFrom(new InternetAddress("omega.quantium@gmail.com"));

            msg.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(to, false));

            msg.setSubject(subject);

            //msg.setText(EMAIL_TEXT);

            String EMAIL_TEXT = content;
            msg.setDataHandler(new DataHandler(new HTMLDataSource(EMAIL_TEXT)));

            SMTPTransport t = (SMTPTransport) session.getTransport("smtp");

            t.connect(SMTP_SERVER,  "omega.quantium@gmail.com", "myOmega!23");

            t.sendMessage(msg, msg.getAllRecipients());

            t.close();
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    static class HTMLDataSource implements DataSource {

        private String html;

        public HTMLDataSource(String htmlString) {
            html = htmlString;
        }

        @Override
        public InputStream getInputStream() throws IOException {
            if (html == null) throw new IOException("html message is null!");
            return new ByteArrayInputStream(html.getBytes());
        }

        @Override
        public OutputStream getOutputStream() throws IOException {
            throw new IOException("This DataHandler cannot write HTML");
        }

        @Override
        public String getContentType() {
            return "text/html";
        }

        @Override
        public String getName() {
            return "HTMLDataSource";
        }
    }
}

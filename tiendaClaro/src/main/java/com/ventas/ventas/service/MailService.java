package com.ventas.ventas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail( String to, String subject, String body) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setFrom("Tigo");
        mail.setTo(to);
        mail.setSubject("Compras Tigo mes de " + subject);
        mail.setText(body);

        javaMailSender.send(mail);
    }
}
import { FormType } from "@/schemas/contactForm";

export const adminEmailTemplate = (data: FormType) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f7f9fb;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px;">
      <img src="https://www.mimedcarellc.com/_next/image?url=%2Fimages%2Flogo-t.png&w=640&q=75" alt="MI MedCare LLC" style="width:180px; margin-bottom: 20px;" />

      <h2 style="color:#7846FF;">New Contact Form Submission</h2>
      <p style="font-size: 15px;">A new message was submitted through your website.</p>

      <h3 style="color:#7846FF; margin-top: 25px;">Form Details</h3>

      <div style="background:#F3EDFF; padding: 15px; border-radius: 6px;">
        <p><strong>First Name:</strong> ${data.firstName} </p>
        <p><strong>Last Name:</strong> ${data.lastName} </p>
        <p><strong>Email:</strong> ${data.email} </p>
        <p><strong>Phone:</strong> ${data.phone} </p>
        <p><strong>Message:</strong>  ${data.message} </p>
      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #999;">
        MI MedCare LLC | New Website Inquiry
      </p>
    </div>
  </div>
`;

export const userEmailTemplate = (data: FormType) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f7f9fb;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px;">
      <img src="https://www.mimedcarellc.com/_next/image?url=%2Fimages%2Flogo-t.png&w=640&q=75" alt="MI MedCare LLC" style="width:180px; margin-bottom: 20px;" />

      <h2 style="color:#7846FF;">Thank You for Contacting Us!</h2>

      <p style="font-size: 15px;">
        Hi ${data.firstName},<br/><br/>
        Thank you for reaching out to <strong>MI MedCare LLC</strong>.
        We’ve received your message and our support team will get back to you shortly.
      </p>

      <h3 style="color:#7846FF; margin-top: 25px;">Your Message</h3>

      <div style="background:#F3EDFF; padding: 15px; border-radius: 6px;">
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #999;">
        MI MedCare LLC  
        <br />
        <a href="https://mimedcarellc.com" style="color:#7846FF;">Visit our website</a>
      </p>
    </div>
  </div>
`;

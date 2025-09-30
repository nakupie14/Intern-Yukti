// src/pages/admin-dashboard/component/NotificationService.js

/**
 * This is a mock notification service to simulate sending emails and SMS.
 * In a real application, this would integrate with services like SendGrid for email and Twilio for SMS.
 */
export const NotificationService = {
  /**
   * Mocks sending an email notification to a student.
   * @param {object} student - The student object, including name and email.
   * @param {object} internship - The allocated internship object.
   * @param {object} allocationDetails - Details about the allocation, including score.
   * @returns {Promise<object>} - A promise that resolves with the result.
   */
  sendEmailNotification: async (student, internship, allocationDetails) => {
    console.log(`📧 Preparing email for ${student.name} (${student.email})...`);
    
    const emailBody = `
      Dear ${student.name},
      
      Congratulations! You have been successfully allocated an internship through the PM Internship Scheme.
      
      --- INTERNSHIP DETAILS ---
      Position: ${internship.title}
      Company: ${internship.company}
      Location: ${internship.location}
      Duration: ${internship.duration}
      Stipend: ${internship.stipend}
      
      --- YOUR MATCH SCORE ---
      Score: ${allocationDetails.score}/100 (Confidence: ${allocationDetails.confidence})
      
      Next Steps:
      1. Please log in to your dashboard on the PM Internship portal for more details.
      2. The company's HR department will contact you within the next 5 business days with further instructions.
      
      We wish you the best of luck with your internship!
      
      Sincerely,
      Ministry of Corporate Affairs (MoCA)
      PM Internship Scheme
    `;
    
    // Simulate an API call to an email service like SendGrid
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`✅ Email successfully sent to ${student.email}`);
        // For demonstration, we log the email body to the console.
        // In a real app, this would be handled by the backend.
        console.log(`--- Email Body for ${student.name} ---\n${emailBody}`);
        resolve({ success: true, studentId: student.id, email: student.email });
      }, 500); // Simulate network delay
    });
  },

  /**
   * Sends notifications for all provided allocations.
   * @param {Array<object>} allocations - The list of allocation objects.
   * @param {Array<object>} students - The full list of student data.
   * @param {Array<object>} internships - The full list of internship data.
   * @returns {Promise<object>} - A promise that resolves with a summary of the notification results.
   */
  sendAllNotifications: async (allocations, students, internships) => {
    console.log(`📤 Starting notification process for ${allocations.length} allocated students...`);
    
    const results = {
      email: { success: 0, failed: 0 },
    };

    // Use Promise.all to send notifications concurrently for better performance
    const notificationPromises = allocations.map(async (allocation) => {
      const student = students.find(s => s.id === allocation.studentId);
      const internship = internships.find(i => i.id === allocation.internshipId);
      
      if (!student || !internship) {
        results.email.failed++;
        return;
      }

      try {
        await NotificationService.sendEmailNotification(student, internship, allocation);
        results.email.success++;
      } catch (error) {
        console.error(`Failed to send email for student ${student.id}:`, error);
        results.email.failed++;
      }
    });

    await Promise.all(notificationPromises);

    console.log('✅ Notification process completed. Summary:', results);
    return results;
  }
};
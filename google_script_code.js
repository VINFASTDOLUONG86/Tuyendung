function doPost(e) {
  try {
    // Log incoming data for debugging
    console.log('Received data:', e.postData.contents);
    
    // Parse JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Log parsed data
    console.log('Parsed data:', data);
    
    // Open Google Sheet
    const sheetId = 'AKfycbybxtHTf1C4pkqvw0V1CLnH4Hobpf12nixT9I6OY5fTzI-XxrsZjqjzlyPjKjdtYELN';
    const sheetName = 'Thông Tin Ứng Viên';
    
    console.log('Opening sheet:', sheetId, sheetName);
    
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
    
    // Check if sheet exists
    if (!sheet) {
      throw new Error('Sheet "' + sheetName + '" not found');
    }
    
    console.log('Sheet found, last row:', sheet.getLastRow());
    
    // If sheet is empty, create header row
    if (sheet.getLastRow() === 0) {
      const headers = ['Thời gian nộp', 'Họ tên', 'Số điện thoại', 'Năm sinh', 'Địa chỉ', 'Vị trí ứng tuyển', 'Trình độ học vấn', 'Kinh nghiệm'];
      sheet.appendRow(headers);
      console.log('Header row created');
    }
    
    // Prepare data row
    const rowData = [
      new Date(),
      data.name || '',
      data.phone || '',
      data.birthYear || '',
      data.address || '',
      data.position || '',
      data.education || '',
      data.experience || ''
    ];
    
    console.log('Data to insert:', rowData);
    
    // Append data to sheet
    sheet.appendRow(rowData);
    
    console.log('Data inserted successfully');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Hồ sơ đã được lưu thành công!',
        'data': rowData
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error occurred:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Có lỗi xảy ra: ' + error.toString(),
        'error': error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("API đang hoạt động").setMimeType(ContentService.MimeType.TEXT);
}
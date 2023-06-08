package com.nw.controller;


import com.nw.payload.UploadFileResponse;
import com.nw.service.FileStorageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
@Transactional
public class DocumentsController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = "http://localhost:8081/upload/" + fileName;

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @DeleteMapping("/deleteFile/{fileName}")
    public UploadFileResponse deleteFile(@PathVariable String fileName) throws IOException {
        fileStorageService.delete(fileName);
        return new UploadFileResponse(fileName, fileName,
                fileName, 0);
    }

}

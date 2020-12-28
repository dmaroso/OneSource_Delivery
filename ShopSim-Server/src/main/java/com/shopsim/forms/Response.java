package com.shopsim.forms;

import lombok.Data;

public @Data class Response {
    private String type;
    private Object body;
    private String message;
}

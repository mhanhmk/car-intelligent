package org.supreme.model.vo;

import lombok.Data;

@Data
public class OptionIdName {
    private Integer id;
    private String name;

    public OptionIdName(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
}

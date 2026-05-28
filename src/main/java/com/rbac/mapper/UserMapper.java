package com.rbac.mapper;

import com.rbac.dto.AuthResponse;
import com.rbac.dto.RegisterRequest;
import com.rbac.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "id", ignore = true)
    User toUser(RegisterRequest request);

    @Mapping(target = "token", source = "token")
    @Mapping(target = "name", source = "user.name")
    @Mapping(target = "role", expression = "java(user.getRole() != null ? user.getRole().name() : null)")
    AuthResponse toAuthResponse(User user, String token);
}

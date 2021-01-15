Spring Security with JWT for REST API

Spring被认为是Java生态系统中值得信赖的框架，并被广泛使用。将Spring称为框架已不再有效，因为它更多地是涵盖各种框架的总称。这些框架之一是Spring Security，它是一个功能强大且可自定义的身份验证和授权框架。它被认为是确保基于Spring的应用程序安全的事实上的标准。

尽管它很流行，但我必须承认，对于单页面应用程序，它的配置并不简单明了。我怀疑原因是它开始于面向MVC应用程序的框架，该框架在服务器端进行网页渲染，并且通信基于会话。

如果后端基于Java和Spring，则使用Spring Security进行身份验证/授权并将其配置为无状态通信是有意义的。尽管有很多文章解释了如何完成此操作，但对我来说，第一次进行设置仍然令人沮丧，而且我不得不从多个来源阅读和总结信息。这就是为什么我决定写这篇文章的原因，在这里我将尝试总结并涵盖您在配置过程中可能遇到的所有必需的细微细节和缺点。



## Defining Terminology


在深入探讨技术细节之前，我想明确定义Spring Security上下文中使用的术语，以确保我们都说相同的语言。

这些是我们需要解决的术语：

* Authentication: 是指根据提供的凭据验证用户身份的过程。一个常见的示例是在登录网站时输入用户名和密码。
* Authorization: 是指假设用户已成功通过身份验证，确定用户是否具有执行特定操作或读取特定数据的适当权限的过程。
* Principle: 是指当前已认证的用户。
* Granted authority: 是指经过身份验证的用户的权限。
* Role: 是指经过身份验证的用户的一组权限。


##　Spring Security Architecture Overview

在开始自定义配置之前，让我们首先讨论Spring Security身份验证如何在后台工作。

![](https://bs-uploads.toptal.io/blackfish-uploads/uploaded_file/file/412345/image-1602672495860.085-952930c83f53503d7e84d1371bec3775.png)

## Spring Security Filters Chain

当您将Spring Security框架添加到您的应用程序时，它会自动注册一个过滤器链来拦截所有传入的请求。该链由各种过滤器组成，每个过滤器处理一个特定的用例。

例如：

- 根据配置检查请求的URL是否可公开访问。
- 果是基于会话的身份验证，请检查用户是否已在当前会话中通过身份验证。
- 检查用户是否有权执行请求的操作，依此类推。

我要提到的一个重要细节是，Spring Security过滤器以最低顺序注册，并且是第一个调用的过滤器。
对于某些用例，如果要在其前面放置自定义过滤器，则需要在其顺序中添加填充。可以使用以下配置完成此操作：

```properties
spring.security.filter.order=10
```


一旦将此配置添加到application.properties文件中，我们将在Spring Security过滤器前面有10个自定义过滤器的空间。

### AuthenticationManager 认证管理器

您可以将其AuthenticationManager视为可以在其中注册多个providers的协调器coordinator，并且根据请求类型，它将向正确的提供程序provider传递身份验证请求。

### AuthenticationProvider 身份验证提供者

AuthenticationProvider处理特定类型的身份验证。其界面仅提供两个功能：

* authenticate 对请求执行身份验证。
* supports 检查此提供程序Provider是否支持指示的身份验证类型。

One important implementation of the interface that we are using in our sample project is `DaoAuthenticationProvider`从检索用户详细信息`UserDetailsService`。

### UserDetailsS​​ervice

UserDetailsService 在Spring文档中，它被描述为加载用户特定数据的核心接口。

在大多数情况下，身份验证提供程序会根据凭据从数据库中提取用户身份信息，然后执行验证。因为这种用例非常普遍，所以Spring开发人员决定将其提取为单独的接口，从而公开单个功能：

* `loadUserByUsername `接受用户名作为参数并返回用户身份对象。

## 使用JWT和Spring Security进行身份验证

在讨论了Spring Security框架的内部结构之后，我们将其配置为使用JWT令牌进行无状态认证。

为了自定义Spring Security，我们需要一个`@EnableWebSecurity`在类路径中带有注解的配置类。另外，为了简化定制过程，框架公开了一个`WebSecurityConfigurerAdapter`类。我们将扩展此适配器并覆盖其两个功能，以便：

1. 使用正确的提供程序配置身份验证管理器
2. 配置网络安全性（公共URL，私有URL，授权等）

```java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // TODO configure authentication manager
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // TODO configure web security
    }

}
```
在示例应用程序中，我们将用户身份存储在users集合中的MongoDB数据库中。这些身份由User实体映射，它们的CRUD操作由UserRepoSpring Data存储库定义。

现在，当我们接受身份验证请求时，我们需要使用提供的凭据从数据库中检索正确的身份，然后进行验证。为此，我们需要实现UserDetailsService接口，其定义如下：

```java
public interface UserDetailsService {

    UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException;

}
```

在这里，我们可以看到需要返回实现该`UserDetails`接口的对象，而我们的User实体也实现了它。考虑到它仅公开单功能原型的事实，我们可以将其视为功能接口，并以lambda表达式形式提供实现。

```java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserRepo userRepo;

    public SecurityConfig(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(username -> userRepo
            .findByUsername(username)
            .orElseThrow(
                () -> new UsernameNotFoundException(
                    format("User: %s, not found", username)
                )
            ));
    }

    // Details omitted for brevity

}
```

在这里，`auth.userDetailsService`函数调用将`DaoAuthenticationProvider`使用我们的`UserDetailsService`接口实现来启动实例，并将其注册到身份验证管理器中。

与身份验证提供程序一起，我们需要为身份验证管理器配置正确的密码编码架构，以用于凭据验证。为此，我们需要将`PasswordEncoder`接口的首选实现公开为bean。

在我们的示例项目中，我们将使用bcrypt密码哈希算法。

```java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserRepo userRepo;

    public SecurityConfig(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(username -> userRepo
            .findByUsername(username)
            .orElseThrow(
                () -> new UsernameNotFoundException(
                    format("User: %s, not found", username)
                )
            ));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Details omitted for brevity

}
```

配置了身份验证管理器后，我们现在需要配置Web安全。我们正在实现REST API，需要使用JWT令牌进行无状态身份验证；因此，我们需要设置以下选项：

- 启用CORS并禁用CSRF。
- 将会话管理设置为无状态。
- 设置未授权的请求异常处理程序。
- 在端点上设置权限。
- 添加JWT令牌过滤器。


此配置实现如下：

```java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserRepo userRepo;
    private final JwtTokenFilter jwtTokenFilter;

    public SecurityConfig(UserRepo userRepo,
                          JwtTokenFilter jwtTokenFilter) {
        this.userRepo = userRepo;
        this.jwtTokenFilter = jwtTokenFilter;
    }

    // Details omitted for brevity

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Enable CORS and disable CSRF
        http = http.cors().and().csrf().disable();

        // Set session management to stateless
        http = http
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and();

        // Set unauthorized requests exception handler
        http = http
            .exceptionHandling()
            .authenticationEntryPoint(
                (request, response, ex) -> {
                    response.sendError(
                        HttpServletResponse.SC_UNAUTHORIZED,
                        ex.getMessage()
                    );
                }
            )
            .and();

        // Set permissions on endpoints
        http.authorizeRequests()
            // Our public endpoints
            .antMatchers("/api/public/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/author/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/author/search").permitAll()
            .antMatchers(HttpMethod.GET, "/api/book/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/book/search").permitAll()
            // Our private endpoints
            .anyRequest().authenticated();

        // Add JWT token filter
        http.addFilterBefore(
            jwtTokenFilter,
            UsernamePasswordAuthenticationFilter.class
        );
    }

    // Used by spring security if CORS is enabled.
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}
```

请注意，我们`JwtTokenFilter`在Spring Security内部之前添加了`UsernamePasswordAuthenticationFilter`。之所以这样做，是因为此时我们需要访问用户身份以执行身份验证/授权，并且它的提取发生在基于提供的JWT令牌的JWT令牌过滤器内。它的实现如下：


```java
@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepo userRepo;

    public JwtTokenFilter(JwtTokenUtil jwtTokenUtil,
                          UserRepo userRepo) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepo = userRepo;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {
        // Get authorization header and validate
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (isEmpty(header) || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        // Get jwt token and validate
        final String token = header.split(" ")[1].trim();
        if (!jwtTokenUtil.validate(token)) {
            chain.doFilter(request, response);
            return;
        }

        // Get user identity and set it on the spring security context
        UserDetails userDetails = userRepo
            .findByUsername(jwtTokenUtil.getUsername(token))
            .orElse(null);

        UsernamePasswordAuthenticationToken
            authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null,
                userDetails == null ?
                    List.of() : userDetails.getAuthorities()
            );

        authentication.setDetails(
            new WebAuthenticationDetailsSource().buildDetails(request)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }

}

```

在实现我们的登录API功能之前，我们需要多做一步-需要访问身份验证管理器。默认情况下，它不是公共可访问的，我们需要在配置类中将其显式公开为bean。

可以按照以下步骤进行：


```java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // Details omitted for brevity

    @Override @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
```

现在，我们准备实现我们的登录API功能：

```java
@Api(tags = "Authentication")
@RestController @RequestMapping(path = "api/public")
public class AuthApi {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserViewMapper userViewMapper;

    public AuthApi(AuthenticationManager authenticationManager,
                   JwtTokenUtil jwtTokenUtil,
                   UserViewMapper userViewMapper) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userViewMapper = userViewMapper;
    }

    @PostMapping("login")
    public ResponseEntity<UserView> login(@RequestBody @Valid AuthRequest request) {
        try {
            Authentication authenticate = authenticationManager
                .authenticate(
                    new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()
                    )
                );

            User user = (User) authenticate.getPrincipal();

            return ResponseEntity.ok()
                .header(
                    HttpHeaders.AUTHORIZATION,
                    jwtTokenUtil.generateAccessToken(user)
                )
                .body(userViewMapper.toUserView(user));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
```


在这里，我们使用身份验证管理器验证提供的凭据，并在成功的情况下生成JWT令牌，并将其作为响应标头以及响应主体中的用户身份信息返回。

## 使用Spring Security授权

在上一节中，我们设置了身份验证过程并配置了公共/私有URL。这对于简单的应用程序可能就足够了，但是对于大多数实际用例，我们始终需要为用户提供基于角色的访问策略。在本章中，我们将解决此问题，并使用Spring Security框架设置基于角色的授权架构。

在示例应用程序中，我们定义了以下三个角色：

USER_ADMIN 允许我们管理应用程序用户。
AUTHOR_ADMIN 允许我们管理作者。
BOOK_ADMIN 允许我们管理书籍。
现在，我们需要将它们应用于相应的URL：

api/public 可公开访问。
api/admin/user可以访问具有该USER_ADMIN角色的用户。
api/author可以访问具有该AUTHOR_ADMIN角色的用户。
api/book可以访问具有该BOOK_ADMIN角色的用户。
Spring Security框架为我们提供了两个选项来设置授权模式：

基于URL的配置
基于注释的配置
首先，让我们看看基于URL的配置如何工作。可以将其应用于Web安全配置，如下所示：

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // Details omitted for brevity

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Enable CORS and disable CSRF
        http = http.cors().and().csrf().disable();

        // Set session management to stateless
        http = http
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and();

        // Set unauthorized requests exception handler
        http = http
            .exceptionHandling()
            .authenticationEntryPoint(
                (request, response, ex) -> {
                    response.sendError(
                        HttpServletResponse.SC_UNAUTHORIZED,
                        ex.getMessage()
                    );
                }
            )
            .and();

        // Set permissions on endpoints
        http.authorizeRequests()
            // Our public endpoints
            .antMatchers("/api/public/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/author/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/author/search").permitAll()
            .antMatchers(HttpMethod.GET, "/api/book/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/book/search").permitAll()
            // Our private endpoints
            .antMatchers("/api/admin/user/**").hasRole(Role.USER_ADMIN)
            .antMatchers("/api/author/**").hasRole(Role.AUTHOR_ADMIN)
            .antMatchers("/api/book/**").hasRole(Role.BOOK_ADMIN)
            .anyRequest().authenticated();

        // Add JWT token filter
        http.addFilterBefore(
            jwtTokenFilter,
            UsernamePasswordAuthenticationFilter.class
        );
    }

    // Details omitted for brevity

}
如您所见，这种方法简单明了，但有一个缺点。应用程序中的授权模式可能很复杂，如果我们在一个地方定义所有规则，它将变得非常庞大，复杂且难以阅读。因此，我通常更喜欢使用基于注释的配置。

Spring Security框架为Web安全定义了以下注释：

@PreAuthorize支持Spring Expression Language，并用于在执行该方法之前提供基于表达式的访问控制。
@PostAuthorize支持Spring表达式语言，用于在执行方法后提供基于表达式的访问控制（提供访问方法结果的能力）。
@PreFilter支持Spring Expression Language，并用于根据我们定义的自定义安全规则在执行方法之前过滤集合或数组。
@PostFilter支持Spring表达式语言，用于在根据我们定义的自定义安全规则执行方法后过滤返回的集合或数组（提供访问方法结果的能力）。
@Secured不支持Spring Expression Language，用于指定方法中的角色列表。
@RolesAllowed不支持Spring Expression Language，它是JSR 250的等效@Secured注释。
这些注释默认情况下处于禁用状态，可以在我们的应用程序中启用，如下所示：

@EnableWebSecurity
@EnableGlobalMethodSecurity(
    securedEnabled = true,
    jsr250Enabled = true,
    prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // Details omitted for brevity

}

securedEnabled = true启用@Secured注释。
jsr250Enabled = true启用@RolesAllowed注释。
prePostEnabled = true使@PreAuthorize，@PostAuthorize，@PreFilter，@PostFilter注释。

启用它们后，我们可以在我们的API端点上实施基于角色的访问策略，如下所示：

@Api(tags = "UserAdmin")
@RestController @RequestMapping(path = "api/admin/user")
@RolesAllowed(Role.USER_ADMIN)
public class UserAdminApi {

    // Details omitted for brevity

}

@Api(tags = "Author")
@RestController @RequestMapping(path = "api/author")
public class AuthorApi {

    // Details omitted for brevity

    @RolesAllowed(Role.AUTHOR_ADMIN)
    @PostMapping
    public void create() { }

    @RolesAllowed(Role.AUTHOR_ADMIN)
    @PutMapping("{id}")
    public void edit() { }

    @RolesAllowed(Role.AUTHOR_ADMIN)
    @DeleteMapping("{id}")
    public void delete() { }

    @GetMapping("{id}")
    public void get() { }

    @GetMapping("{id}/book")
    public void getBooks() { }

    @PostMapping("search")
    public void search() { }

}

@Api(tags = "Book")
@RestController @RequestMapping(path = "api/book")
public class BookApi {

    // Details omitted for brevity

    @RolesAllowed(Role.BOOK_ADMIN)
    @PostMapping
    public BookView create() { }

    @RolesAllowed(Role.BOOK_ADMIN)
    @PutMapping("{id}")
    public void edit() { }

    @RolesAllowed(Role.BOOK_ADMIN)
    @DeleteMapping("{id}")
    public void delete() { }

    @GetMapping("{id}")
    public void get() { }

    @GetMapping("{id}/author")
    public void getAuthors() { }

    @PostMapping("search")
    public void search() { }

}
请注意，可以在类级别和方法级别上提供安全注释。

演示的示例很简单，并不代表实际情况，但是Spring Security提供了丰富的注释集，如果选择使用它们，则可以处理复杂的授权模式。

角色名称默认前缀
在这一单独的小节中，我想强调一个使许多新用户感到困惑的细微细节。

Spring Security框架区分两个术语：

Authority 代表个人许可。
Role 代表一组权限。
两者都可以用一个单独的接口表示，GrantedAuthority然后在Spring Security批注中使用Spring Expression Language进行检查，如下所示：

Authority：@PreAuthorize（“ hasAuthority（'EDIT_BOOK'）”）
Role：@PreAuthorize（“ hasRole（'BOOK_ADMIN'）”）
为了使这两个术语之间的区别更明确，Spring Security框架ROLE_默认为角色名称添加前缀。因此，BOOK_ADMIN它不会检查名为的角色，而是会检查ROLE_BOOK_ADMIN。

就个人而言，我发现这种行为令人困惑，并且更喜欢在我的应用程序中禁用它。可以在Spring Security配置中禁用它，如下所示：

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // Details omitted for brevity

    @Bean
    GrantedAuthorityDefaults grantedAuthorityDefaults() {
        return new GrantedAuthorityDefaults(""); // Remove the ROLE_ prefix
    }

}


https://github.com/Yoh0xFF/java-spring-security-example

























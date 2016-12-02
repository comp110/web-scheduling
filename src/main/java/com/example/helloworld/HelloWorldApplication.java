package com.example.helloworld;

import com.example.helloworld.auth.ExampleAuthenticator;
import com.example.helloworld.auth.ExampleAuthorizer;
import com.example.helloworld.cli.RenderCommand;
import com.example.helloworld.core.Person;
import com.example.helloworld.core.LA;
import com.example.helloworld.core.Master;
import com.example.helloworld.core.Template;
import com.example.helloworld.core.User;
import com.example.helloworld.core.User2;
import com.example.helloworld.db.PersonDAO;
import com.example.helloworld.db.LADAO;
import com.example.helloworld.db.MasterDAO;
import com.example.helloworld.db.UserDAO;
import com.example.helloworld.filter.DateRequiredFeature;
import com.example.helloworld.health.TemplateHealthCheck;
import com.example.helloworld.resources.FilteredResource;
import com.example.helloworld.resources.HelloWorldResource;
import com.example.helloworld.resources.PeopleResource;
import com.example.helloworld.resources.LAResource;
import com.example.helloworld.resources.LAResourceID;
import com.example.helloworld.resources.PersonResource;
import com.example.helloworld.resources.MasterResource;
import com.example.helloworld.resources.ProtectedResource;
import com.example.helloworld.resources.UserResource;
import com.example.helloworld.resources.scheduleResource;
import com.example.helloworld.resources.DefaultResource;
import com.example.helloworld.resources.ViewResource;
import com.example.helloworld.resources.UserResource;
import com.example.helloworld.resources.LAResourceCopyJson;
import com.example.helloworld.resources.MasterResourceCopyJson;
import com.example.helloworld.tasks.EchoTask;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.views.ViewBundle;
import io.dropwizard.hibernate.UnitOfWorkAwareProxyFactory;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.hibernate.SessionFactory;
import java.util.EnumSet;
import java.util.Map;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;

public class HelloWorldApplication extends Application<HelloWorldConfiguration> {
    public static void main(String[] args) throws Exception {
        new HelloWorldApplication().run(args);
    }

    private final HibernateBundle<HelloWorldConfiguration> hibernateBundle =
        new HibernateBundle<HelloWorldConfiguration>(Person.class, LA.class, Master.class, User2.class) {
            @Override
            public DataSourceFactory getDataSourceFactory(HelloWorldConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        };

    @Override
    public String getName() {
        return "hello-world";
    }

    @Override
    public void initialize(Bootstrap<HelloWorldConfiguration> bootstrap) {
        // Enable variable substitution with environment variables
       bootstrap.addBundle(new AssetsBundle("/assets/FrontEndDevelopment", "/", "index.html"));
    //    bootstrap.addBundle(new AssetsBundle("/assets/FrontEndDevelopment", "/hourset", "index.html"));
    //   bootstrap.addBundle(new AssetsBundle("/assets", "/js",  "load-events.js"));
   //  bootstrap.addBundle(new AssetsBundle("/assets", "/js", "calendar-events.js"));
   //   bootstrap.addBundle(new AssetsBundle("/assets", "/css", "style.css"));
       bootstrap.setConfigurationSourceProvider(
                new SubstitutingSourceProvider(
                        bootstrap.getConfigurationSourceProvider(),
                        new EnvironmentVariableSubstitutor(false)
                )
        );

        bootstrap.addCommand(new RenderCommand());
        //bootstrap.addBundle(new AssetsBundle());
        bootstrap.addBundle(new MigrationsBundle<HelloWorldConfiguration>() {
            @Override
            public DataSourceFactory getDataSourceFactory(HelloWorldConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        });
        bootstrap.addBundle(hibernateBundle);
       
        bootstrap.addBundle(new ViewBundle<HelloWorldConfiguration>() {
            @Override
            public Map<String, Map<String, String>> getViewConfiguration(HelloWorldConfiguration configuration) {
                return configuration.getViewRendererConfiguration();
            }
        });
    }

    @Override
    public void run(HelloWorldConfiguration configuration, Environment environment) {

        final FilterRegistration.Dynamic cors = environment.servlets().addFilter("CORS", CrossOriginFilter.class);

        // Configure CORS parameters
        cors.setInitParameter("allowedOrigins", "*");
        cors.setInitParameter("allowedHeaders", "X-Requested-With,Content-Type,Accept,Origin");
        cors.setInitParameter("allowedMethods", "OPTIONS,GET,PUT,POST,DELETE,HEAD");

        // Add URL mapping
        cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");
        environment.jersey().setUrlPattern("/api/*");
        final PersonDAO dao = new PersonDAO(hibernateBundle.getSessionFactory());
        final LADAO dao2 = new LADAO(hibernateBundle.getSessionFactory());
        final MasterDAO dao3 = new MasterDAO(hibernateBundle.getSessionFactory());
        final UserDAO dao4 = new UserDAO(hibernateBundle.getSessionFactory());
        final Template template = configuration.buildTemplate();
         final ExampleAuthenticator authenticator
                = new UnitOfWorkAwareProxyFactory(hibernateBundle)
                .create(ExampleAuthenticator.class,
                        new Class<?>[]{UserDAO.class, SessionFactory.class},
                        new Object[]{dao4,
                            hibernateBundle.getSessionFactory()});
        environment.healthChecks().register("template", new TemplateHealthCheck(template));
        environment.admin().addTask(new EchoTask());
        environment.jersey().register(DateRequiredFeature.class);
        environment.jersey().register(new AuthDynamicFeature(new BasicCredentialAuthFilter.Builder<User>()
                .setAuthenticator(authenticator)
                .setAuthorizer(new ExampleAuthorizer())
                .setRealm("SUPER SECRET STUFF")
                .buildAuthFilter()));
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(User.class));
        environment.jersey().register(RolesAllowedDynamicFeature.class);
        environment.jersey().register(new HelloWorldResource(template));
        environment.jersey().register(new ViewResource());
        environment.jersey().register(new ProtectedResource());
        environment.jersey().register(new PeopleResource(dao));
        environment.jersey().register(new PersonResource(dao));
        environment.jersey().register(new LAResource(dao2));
        environment.jersey().register(new LAResourceID(dao2));
        environment.jersey().register(new LAResourceCopyJson(dao2));
        environment.jersey().register(new MasterResource(dao3));
        environment.jersey().register(new MasterResourceCopyJson(dao3));
        environment.jersey().register(new UserResource(dao4));
        environment.jersey().register(new scheduleResource());
       // environment.jersey().register(new DefaultResource());
        environment.jersey().register(new FilteredResource());
    }
}

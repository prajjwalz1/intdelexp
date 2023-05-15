'use strict';
{
    const $ = django.jQuery;
    const fields = $('#django-admin-prepopulated-fields-constants').data('prepopulatedFields');
    $.each(fields, function(index, field) {
<<<<<<< HEAD
        $('.empty-form .form-row .field-' + field.name + ', .empty-form.form-row .field-' + field.name).addClass('prepopulated_field');
=======
        $(
            '.empty-form .form-row .field-' + field.name +
            ', .empty-form.form-row .field-' + field.name +
            ', .empty-form .form-row.field-' + field.name
        ).addClass('prepopulated_field');
>>>>>>> 2ba6666c1b7e6a1fc378e7ee5cd7957342225e36
        $(field.id).data('dependency_list', field.dependency_list).prepopulate(
            field.dependency_ids, field.maxLength, field.allowUnicode
        );
    });
}

const crudMethods = require("./crudMethods");
const article = require('./article')
const post = require('./post')
const travelPlan = require('./travelPlan')
const profile = require('./profile')
const role = require('./role')
const mongoose = require("mongoose");

exports.crudController = (modelName) => {
    const Model = mongoose.model(modelName);
    let methods = {};

    methods.create = async (req, res) => {
        await crudMethods.create(Model, req, res);
    };

    methods.read = async (req, res) => {
        await crudMethods.read(Model, req, res);
    };

    methods.update = async (req, res) => {
        await crudMethods.update(Model, req, res);
    };

    methods.delete = async (req, res) => {
        await crudMethods.delete(Model, req, res);
    };

    methods.list = async (req, res) => {
        await crudMethods.list(Model, req, res);
    };

    methods.search = async (req, res) => {
        await crudMethods.search(Model, req, res);
    };

    return methods;
};

exports.article = (modelName) => {
    const Model = mongoose.model(modelName);
    let methods = {};

    methods.create = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('article_c') || req.admin.isSuperAdmin) await article.create(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.update = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('article_u') || req.admin.isSuperAdmin) await article.update(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.delete = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('article_d') || req.admin.isSuperAdmin) await crudMethods.delete(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.search = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('article_r') || req.admin.isSuperAdmin) await crudMethods.search(Model, req, res, 'article');
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.read = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('article_r') || req.admin.isSuperAdmin) await crudMethods.read(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.list = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('article_r') || req.admin.isSuperAdmin) await crudMethods.list(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };
    return methods;
}


exports.post = (modelName) => {
    const Model = mongoose.model(modelName);
    let methods = {};

    methods.create = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('feed_c') || req.admin.isSuperAdmin) await post.create(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.update = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('feed_u') || req.admin.isSuperAdmin) await post.update(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.delete = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('feed_d') || req.admin.isSuperAdmin) await post.delete(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.search = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('feed_r') || req.admin.isSuperAdmin) await crudMethods.search(Model, req, res, 'post');
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.read = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('feed_r') || req.admin.isSuperAdmin) await crudMethods.read(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.list = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('feed_r') || req.admin.isSuperAdmin) await crudMethods.list(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.getTags = async (req, res) => {
        await crudMethods.getTags(req, res);
    };
    return methods;
}

exports.travePlan = (modelName) => {
    const Model = mongoose.model(modelName);
    let methods = {};

    methods.create = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('travelplan_c') || req.admin.isSuperAdmin) await travelPlan.create(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.update = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('travelplan_u') || req.admin.isSuperAdmin) await travelPlan.update(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.delete = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('travelplan_d') || req.admin.isSuperAdmin) await crudMethods.delete(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.search = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('travelplan_r') || req.admin.isSuperAdmin) await crudMethods.search(Model, req, res, 'travelPlan');
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.read = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('travelplan_r') || req.admin.isSuperAdmin) await crudMethods.read(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.list = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('travelplan_r') || req.admin.isSuperAdmin) await crudMethods.list(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });

    };
    return methods;
}
exports.profile = (modelName) => {
    const Model = mongoose.model(modelName);
    let methods = {};

    methods.create = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('profile_c') || req.admin.isSuperAdmin) await profile.create(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.update = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('profile_u') || req.admin.isSuperAdmin) await profile.update(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.delete = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('profile_d') || req.admin.isSuperAdmin) await crudMethods.delete(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.search = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('profile_r') || req.admin.isSuperAdmin) await crudMethods.search(Model, req, res, 'profile');
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.read = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('profile_r') || req.admin.isSuperAdmin) await crudMethods.read(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.list = async (req, res) => {
        const {permissions = []} = req.admin.role || {}
        if (permissions.includes('profile_r') || req.admin.isSuperAdmin) await crudMethods.list(Model, req, res);
        else return res.status(404).json({
            success: false,
            result: null,
            message: "Access denied.",
        });
    };

    methods.banUser = async (req, res) => {
        await profile.banUser(Model, req, res);
    };
    return methods;
}

exports.role = (modelName) => {
    const Model = mongoose.model(modelName);
    let methods = {};

    methods.create = async (req, res) => {
        await crudMethods.create(Model, req, res);
    };

    methods.read = async (req, res) => {
        await crudMethods.read(Model, req, res);
    };

    methods.update = async (req, res) => {
        await crudMethods.update(Model, req, res);
    };

    methods.delete = async (req, res) => {
        await role.delete(Model, req, res);
    };

    methods.list = async (req, res) => {
        await crudMethods.list(Model, req, res);
    };

    methods.search = async (req, res) => {
        await crudMethods.search(Model, req, res, 'roles');
    };

    return methods;
};

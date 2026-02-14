class B {
public:
    virtual void f() noexcept {}
};

class D : public B {
public:
    void f() noexcept(false) override {}
};

int main() {}

class S {
public:
    S() = default;
    S(const S&) = delete;
};

int main() {
    S a;
    S b = a;
    (void)b;
}

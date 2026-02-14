#include <iostream>

class S {
public:
    int v = 1;
};

int main() {
    int S::* p = &S::v;

    S s;
    s.*p = 3;

    std::cout << s.v << "\n";
}

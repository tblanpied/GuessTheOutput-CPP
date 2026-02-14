#include <initializer_list>
#include <iostream>

class S {
    std::initializer_list<int> l;
public:
    S(std::initializer_list<int> x) : l(x) {}
    int first() const { return *l.begin(); }
};

int main() {
    S s{1, 2, 3};
    std::cout << s.first() << "\n";
}
